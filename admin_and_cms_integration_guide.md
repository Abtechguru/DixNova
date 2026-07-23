# Admin CMS, Media Uploads & Power BI Presentation Integration Guide

Welcome to the **DixNova Lagos SmartMove Intelligence Platform Admin CMS Documentation**. This guide details how to manage opening videos, image & video media assets, Power BI embedded dashboards, team profiles, and presentation slides.

---

## 1. Executive Summary & Architecture Overview

The Admin CMS Control Center (`/admin`) connects directly to MongoDB via Prisma schema definitions (`ExecutiveSummary`, `MediaAsset`, `PowerBiReport`, `TeamMember`, `ProblemStatement`). Any content or media updated by an administrator is immediately persisted to the database and synced in real-time to the 20-stage Presentation Portal (`/presentation`) and public sub-pages (`/p/*`).

```
                          ┌───────────────────────────┐
                          │   Admin CMS Control Room   │
                          │        (/admin)           │
                          └─────────────┬─────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
  🎥 Video & Media Stage       📊 Power BI Embedded          🖼️ Media Library & Assets
(/api/cms/video)               (/api/cms/powerbi)            (/api/cms/media)
           │                            │                            │
           ▼                            ▼                            ▼
  Stage 01 Presentation        Stage 11 Presentation         Team Members, CMS &
(BiggerRealityVideoStage)     (PresentationPowerBiStage)     Image Galleries
```

---

## 2. Admin CMS Features & User Workflow

### A. 🎥 Opening Story Video & Media Stage Management (Stage 01)
- **Route**: `/admin` -> **Video & Opening Story Tab**
- **Capabilities**:
  - Upload MP4 / WebM video files or high-res images directly from your computer.
  - Or input a custom video/image URL (e.g. `/open.mp4`, hosted asset URLs).
  - Preview the active video player in real-time.
  - Click **Save & Sync** to persist the video source to MongoDB (`ExecutiveSummary.contentJson.videoUrl`).
- **Presentation Reflection**: Automatically updates **Stage 01** (`BiggerRealityVideoStage`) on `/presentation` with smooth zoom-in text animations and continuous backdrop playback.

---

### B. 🖼️ Image & Media Assets Library
- **Route**: `/admin` -> **Media Assets Library Tab**
- **Capabilities**:
  - Multi-file drag-and-drop / file selector for PNG, JPG, WebP, SVG, MP4, and PDF documents.
  - Media uploaded is saved locally into `public/uploads/` with a timestamped safe filename and recorded in MongoDB `MediaAsset`.
  - Filter gallery by **All**, **Images**, or **Videos**.
  - **1-Click Copy URL**: Copies `/uploads/filename...` to clipboard for easy insertion into team profiles, CMS blocks, or external links.
  - **Asset Deletion**: Removes asset record from MongoDB and unlinks file from `public/uploads/`.

---

### C. 📊 Power BI & Visualizations Control (Stage 11 & Portal)
- **Route**: `/admin` -> **Power BI & Visualizations Tab**
- **Capabilities**:
  - Full CRUD control for Power BI reports (`prisma.powerBiReport`).
  - **Fields**:
    - **Report Name**: (e.g. *Commuter Farebox Recovery & Revenue Analytics*)
    - **Category**: (e.g. *Financial Intelligence*, *Traffic Management*)
    - **Power BI Embed URL**: Standard public or embedded Power BI report link (`https://app.powerbi.com/view?r=...`)
    - **Workspace ID & Report ID**: Power BI tenant identifiers.
    - **Description**: Summary of insights presented by the report.
    - **Publish Toggle**: Instantly publish or unpublish reports.
  - **Live Embed Preview**: Toggle an interactive iframe test preview directly inside the admin panel before publishing.
- **Presentation Reflection**: Published reports render in **Stage 11** (`PresentationPowerBiStage`) on `/presentation` and the `/p/powerbi-dashboards` portal with tab switching and fullscreen view.

---

### D. 👥 Team Members CMS Editor (Stage 19)
- **Route**: `/admin` -> **Team Members Tab**
- **Capabilities**:
  - Manage profiles for Team DixNova.
  - Upload profile photos directly or provide image URLs.
  - Edit names, roles, bios, and ordering.
- **Presentation Reflection**: Syncs with **Stage 19** (`TeamMembersGrid`) on `/presentation`.

---

### E. 📝 Problem Statement & 5 Ws Framework (Stage 03)
- **Route**: `/admin` -> **Problem Statement Tab**
- **Capabilities**:
  - Edit the Business Challenge Summary and the 5 Ws:
    - **WHO**: Affected stakeholders (e.g., BRT operators, commuters)
    - **WHAT**: Core transport bottleneck & farebox friction
    - **WHEN**: Peak rush hour periods (06:00-09:30 & 17:00-20:30)
    - **WHERE**: Key corridors (Ikorodu, Lekki-Epe, Ikeja)
    - **WHY**: Economic loss, commuter delay, lost farebox yield
- **Presentation Reflection**: Syncs with **Stage 03** (`ProblemStatement5Ws`) on `/presentation`.

---

## 3. API Endpoints Specification

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/cms/video` | `GET` | Fetch active opening story video URL |
| `/api/cms/video` | `POST` | Update and save opening story video URL |
| `/api/cms/media` | `GET` | Fetch list of uploaded media assets |
| `/api/cms/media` | `POST` | Upload file (multipart/form-data) to `public/uploads/` & record in MongoDB |
| `/api/cms/media` | `DELETE` | Delete media asset by ID from DB and filesystem |
| `/api/cms/powerbi` | `GET` | Fetch all Power BI reports ordered by display order |
| `/api/cms/powerbi` | `POST` | Create new Power BI report configuration |
| `/api/cms/powerbi` | `PUT` | Update Power BI report details or publish state |
| `/api/cms/powerbi` | `DELETE` | Delete Power BI report by ID |
| `/api/cms/team-members` | `GET`, `POST`, `PUT`, `DELETE` | Full CRUD operations for team members |
| `/api/cms/problem-statement` | `GET`, `POST` | Fetch and update 5 Ws problem statement framework |

---

## 4. Verification & Step-by-Step Testing

1. **Launch Admin CMS**: Navigate to `http://localhost:3000/admin`.
2. **Test Video Upload**:
   - Go to **Video & Opening Story** tab.
   - Upload a video or enter a video URL, click **Save & Sync**.
   - Open `http://localhost:3000/presentation` and observe Stage 01 playing the new video.
3. **Test Media Library**:
   - Go to **Media Assets Library** tab.
   - Upload images, click **Copy URL**, paste into any browser window or team member profile.
4. **Test Power BI Embedding**:
   - Go to **Power BI & Visualizations** tab.
   - Click **+ Add Power BI Report**, paste your Power BI Embed URL, toggle **Publish**, and click Save.
   - Toggle **Live Embed Preview** to verify the report loads.
   - Open Stage 11 on `http://localhost:3000/presentation` or visit `http://localhost:3000/p/powerbi-dashboards` to view the report embedded live.
