#!/usr/bin/env python3
"""Şantiye fotoğraflarını public/images/projects/ altına web için optimize ederek kopyalar."""
import os
import shutil
from PIL import Image

SOURCES = [
    "/Users/umit/Downloads/7cb55089-b01f-47c2-a714-01370220bdc1.JPG",
    "/Users/umit/Downloads/fdc938ef-6247-43e0-8910-ad61434f9c1b.JPG",
    "/Users/umit/Downloads/6e44b24f-1695-4ebd-b975-b6cddf534e5d.JPG",
    "/Users/umit/Downloads/31ecf163-3b82-4693-a0a2-a73c8439d800.JPG",
    "/Users/umit/Downloads/38fd0d1d-58be-4bd8-a5a9-6fd436b3abf4.JPG",
    "/Users/umit/Downloads/34a242ce-ca6f-46c8-85e1-b48193d0a114.JPG",
    "/Users/umit/Downloads/a6d184d5-7355-4740-9a7a-fa91ab663bde.JPG",
    "/Users/umit/Downloads/720622ed-bf53-4473-9409-4543bfb4a093.JPG",
    "/Users/umit/Downloads/e2ca8d72-8958-41a4-9b05-07a541c3c08f.JPG",
    "/Users/umit/Downloads/9dda0fd9-7756-4f61-98da-56a8211d3a70.JPG",
    "/Users/umit/Downloads/b5474536-2dea-4137-9c84-03562cb8d13e.JPG",
    "/Users/umit/Downloads/2a691dd8-0ef9-4f55-9010-1ed86d0083f7.JPG",
    "/Users/umit/Downloads/a43577ee-496d-4070-8e3f-17d85a72d578.JPG",
    "/Users/umit/Downloads/8bfb053b-6ba9-4a07-80ad-37960009e697.JPG",
    "/Users/umit/Downloads/162b2c42-228f-4999-8d1f-d8e277f0749d.JPG",
    "/Users/umit/Downloads/97dc973f-c32e-4503-9ddc-379f054b1566.JPG",
    "/Users/umit/Downloads/5ec5f4e4-33bc-4f4a-b2da-9ee373cbafd1.JPG",
    "/Users/umit/Downloads/d2b773c6-7689-4844-b4d4-d6d9b471c691.JPG",
    "/Users/umit/Downloads/6e2f27f4-4863-494a-bccc-8e58fcadc8b7.JPG",
    "/Users/umit/Downloads/29948046-f886-43f5-bdfa-ed3cc34b77cb.JPG",
    "/Users/umit/Downloads/f0969b31-dc1d-4c2b-aa33-3062b8b7875c.JPG",
    "/Users/umit/Downloads/1b52d7be-26a4-4952-87f5-5c41033c96d1.JPG",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/4d85bae6-b3c4-4729-b4cf-72c432b2dc93.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/5e41b5e5-c5b1-4369-96de-0791cca452d2.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/cb85d240-0f59-4b62-88b8-2b3cd8a2d3d9.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/7c1ac361-f381-4043-b5b4-a0244f24a96e.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/c4cd3f21-c6a1-479c-a184-7b659dca37e3.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/d2853701-53cf-4fd3-9d58-fed1465c5e61.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/c2a37fb4-0ae9-46ad-b054-c8f58a69a9e2.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/68fb938a-a4f2-4d81-88f5-b2d7409f5502.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/5a3cf7dd-4cc2-400c-b390-f1e20ca9f29b.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/352de6c0-3bd0-47af-8f72-51179c99830d.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/1f996496-5a01-45f5-8c72-6235368ac35c.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/9d968c6c-fb58-4a9a-af52-1cc9e057b99a.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/accadfc9-2f16-40ad-b111-aae18a3a8ca0.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/6bf712b6-cf5e-4e27-ae6f-90852b75ce46.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/3fed0b84-7cbd-4284-a521-9ea60a82fa81.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/5469a73d-2974-435c-8f94-2bf59fe5e2ee.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/282d9fec-e9c6-4010-9805-66885ff289f8.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/f2ea367e-9493-44fe-993f-9976d6a3bf22.jpg",
    "/Users/umit/Library/Application Support/kimi-desktop/message-queue-assets/e8ad0c8dfa723d51519d/630624117f87b3f88ca2/25a4f37bc11f66cec4a2/f089beee-96bd-46df-9b6f-79f732bf96b9.jpg",
]

DEST = "/Users/umit/Documents/Kimi/Workspaces/Berraİnşaat/berra-insaat/public/images/projects"
MAX_SIDE = 1600

os.makedirs(DEST, exist_ok=True)

for i, src in enumerate(SOURCES, 1):
    if not os.path.exists(src):
        print(f"EKSIK: {src}")
        continue
    img = Image.open(src)
    img = img.convert("RGB")
    img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    name = f"proje-{i:02d}.jpg"
    out = os.path.join(DEST, name)
    img.save(out, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{name}: {os.path.getsize(out)//1024} KB ({img.size[0]}x{img.size[1]})")

print("Toplam:", len(os.listdir(DEST)), "dosya")
