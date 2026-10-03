# DIZHAO Technologies — 官方網站

> **Simple. Focused. Sufficient.**
> 純 HTML + CSS + JS，無框架、無建置工具、可部署到任何靜態主機。

---

## 📁 檔案結構

```
dizhao-website/
├── index.html          首頁（Hero + 4 階段 + 6 能力 + 夥伴牆）
├── about.html          關於我們（Mission + Stats + Team）
├── services.html       服務項目（4 階段詳細 + 6 能力）
├── solutions.html      解決方案（6 場景：SMB/資安/虛擬化/機房/AI/維運）
├── partners.html       合作夥伴（4 大類、共 14 家原廠）
├── contact.html        聯絡我們（雙語表單 + FormSubmit Email 轉發）
├── assets/
│   ├── logo.png        DIZHAO 菱形 X 金箔 LOGO
│   ├── lang.js         中英雙語切換（localStorage 記住偏好）
│   └── form.js         表單送出（FormSubmit 整合 + Toast 訊息）
├── llms.txt            AEO：給 AI 看的網站地圖
├── robots.txt          SEO 爬蟲指引（含 GPTBot/ClaudeBot 允許）
└── sitemap.xml         標準 sitemap
```

---

## 🚀 部署方式（推薦）

### 方案 A：Cloudflare Pages（最推薦 ⭐⭐⭐）

1. **建立 GitHub repo**
   ```bash
   git init
   git add .
   git commit -m "DIZHAO website v1.0"
   # 在 github.com/new 建新 repo（Public 或 Private都行）
   git remote add origin https://github.com/你的帳號/dizhao-website.git
   git push -u origin main
   ```

2. **Cloudflare Pages 部署**
   - 登入 https://dash.cloudflare.com
   - Workers & Pages → Pages → Create application → Connect to Git
   - 選 `dizhao-website` repo
   - Build 設定：
     - Framework preset: **None**
     - Build command: **（留空）**
     - Build output directory: **/ （或 `.`）**
   - Save and Deploy → 1 分鐘後拿到 `xxx.pages.dev` 預設網址

3. **綁定 dizhao.com.tw 自訂網域**
   - 專案 → Custom domains → Set up a custom domain
   - 輸入 `dizhao.com.tw` 和 `www.dizhao.com.tw`
   - Cloudflare 會給 DNS CNAME
   - 到網域註冊商改 DNS（指向 Cloudflare）
   - SSL 自動申請（~5 分鐘）

### 方案 B：自家 Windows IIS（員外已有微軟環境）

1. 複製 `dizhao-website/` 到 `C:\inetpub\wwwroot\dizhao\`
2. IIS Manager → Add Website → 指向該資料夾
3. 綁定 `dizhao.com.tw`（Host name）
4. 用 win-acme 申請 Let's Encrypt SSL
5. DNS A 記錄指向主機 IP

### 方案 C：Netlify / Vercel（類似 Cloudflare Pages）

---

## 📧 FormSubmit 設定（Email 接收）

部署完成後：

1. 打開 `https://dizhao.com.tw/contact.html`
2. 填寫測試訊息並送出
3. FormSubmit 寄驗證信到 `grey@dizhao.com.tw`
4. 點信中的確認連結（啟動 email 接收）
5. 之後所有表單訊息自動寄到 `grey@dizhao.com.tw`

> 免費、無月費、無上限（FormSubmit 由志願者維護的開源服務）

---

## 🌍 雙語切換

- 預設：正體中文
- 切換鈕：右上角「中 / EN」
- 切換後跨頁保留（localStorage）

---

## 🔍 SEO / AEO

- ✅ JSON-LD（Organization / ContactPage / AboutPage / Service / ItemPage）
- ✅ Open Graph meta
- ✅ llms.txt（給 AI 看的網站地圖）
- ✅ sitemap.xml
- ✅ robots.txt（含 GPTBot / ClaudeBot / PerplexityBot / Google-Extended 允許）

---

## 🎨 設計 Token

| Token | Value |
|---|---|
| 主色（深底）| `#0a0d11` |
| 主色（金）| `#D4A849` |
| 亮金 | `#E8C572` |
| 紙白 | `#FAF7F0` |
| 中文字體 | Noto Serif TC |
| 英文字體 | Cormorant Garamond |
| 無襯線 | Inter |

---

## 📜 授權

© 2026 DIZHAO Technologies & Consulting Co., Ltd. All Rights Reserved.