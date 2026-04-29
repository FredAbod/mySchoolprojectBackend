import { Request, Response } from "express";

type SpeakBody = {
  text?: unknown;
  voice?: unknown;
};

const VOICE_MAP: Record<string, { azureVoiceName: string }> = {
  african_english_female: { azureVoiceName: "en-NG-EzinneNeural" },
  african_english_male: { azureVoiceName: "en-NG-AbeoNeural" },
  ghana_english_female: { azureVoiceName: "en-GH-AkuaNeural" },
  ghana_english_male: { azureVoiceName: "en-GH-KofiNeural" },
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function speak(req: Request, res: Response) {
  try {
    const body = (req.body ?? {}) as SpeakBody;

    if (!isNonEmptyString(body.text)) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const text = body.text.trim();
    if (text.length > 500) {
      return res.status(400).json({ message: "Text too long" });
    }

    const voiceKey = isNonEmptyString(body.voice) ? body.voice : "african_english_female";
    const defaultVoice = VOICE_MAP["african_english_female"]!;
    const voice = (VOICE_MAP[voiceKey] ?? defaultVoice) as { azureVoiceName: string };

    const azureKey = process.env.AZURE_SPEECH_KEY;
    const azureRegion = process.env.AZURE_SPEECH_REGION;

    if (!azureKey || !azureRegion) {
      return res.status(501).json({
        message: "TTS not configured",
        requiredEnv: ["AZURE_SPEECH_KEY", "AZURE_SPEECH_REGION"],
      });
    }

    const endpoint = `https://${azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const ssml = [
      `<speak version="1.0" xml:lang="en-NG">`,
      `<voice name="${voice.azureVoiceName}">`,
      `<prosody rate="0%" pitch="0%">${escapeXml(text)}</prosody>`,
      `</voice>`,
      `</speak>`,
    ].join("");

    const r = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": azureKey,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
        "User-Agent": "mySchoolprojectBackend",
      },
      body: ssml,
    });

    if (!r.ok) {
      const textErr = await r.text().catch(() => "");
      return res.status(502).json({
        message: "TTS provider error",
        provider: "azure",
        status: r.status,
        details: textErr || undefined,
      });
    }

    const arrayBuf = await r.arrayBuffer();
    const audioBase64 = Buffer.from(arrayBuf).toString("base64");

    res.json({ audioBase64, mime: "audio/mpeg" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

