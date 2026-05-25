# Modern AI-Powered Advanced Job Portal

Welcome to the ultimate AI-Powered Job Portal. This application bridges the gap between ambitious job seekers and forward-thinking companies using cutting-edge AI features to streamline matching, hiring, and career growth.

## 1. Project Architecture

The architecture is divided into three main components:
1. **Frontend (Next.js)**: A dynamic, highly responsive SSR/SSG web client styled with Tailwind CSS.
2. **Main Backend (Node.js & Express.js)**: Handles business logic, database transactions, role-based access control, and authentication (JWT/OAuth).
3. **AI Microservice (Python FastAPI)**: Handles heavy NLP and ML tasks like resume parsing, ATS scoring, and semantic job matching using `spaCy`, `Sentence Transformers`, and custom ML logic.

### Tech Stack:
- **Frontend**: Next.js, React, Tailwind CSS, Redux Toolkit / Zustand, Framer Motion (for animations), Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Passport.js (Google OAuth).
- **AI Service**: Python, FastAPI, spaCy, HuggingFace Transformers, Sentence Transformers, scikit-learn.
- **Cloud/Storage**: AWS S3 (for resume uploads), Docker (containerization).

---

## 2. Folder Structure

```text
ai-job-portal/
│
├── frontend/               # Next.js Application
│   ├── public/             # Static assets (images, icons)
│   ├── src/
│   │   ├── app/            # Next.js App Router pages (Job Seeker, Recruiter, Admin)
│   │   ├── components/     # Reusable UI components (Buttons, Cards, Modals)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API integration logic
│   │   ├── store/          # Global state management
│   │   └── styles/         # Tailwind global CSS
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                # Node.js + Express.js Application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB Mongoose schemas
│   │   ├── routes/         # Express API routes
│   │   ├── middlewares/    # Auth, Error handling, File upload
│   │   ├── services/       # Business logic & AI Service communication
│   │   └── utils/          # Helpers (Token generation, password hashing)
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── ai-service/             # Python FastAPI Application
    ├── app/
    │   ├── main.py         # FastAPI entry point
    │   ├── api/            # Route endpoints
    │   ├── core/           # Configs and security
    │   ├── models/         # Pydantic request/response models
    │   └── services/       # AI logic (NLP, Cosine Similarity, Parsing)
    ├── requirements.txt
    └── Dockerfile
```

---

## 3. MongoDB Schemas

### User Schema (`User`)
- `_id`, `name`, `email`, `password` (hashed), `role` (seeker, recruiter, admin), `googleId`, `avatar`
- `profile`: Linked to seeker specific data (skills, experience, education, resume URL)
- `companyId`: Linked if role is recruiter

### Job Schema (`Job`)
- `_id`, `recruiterId` (ref: User), `title`, `description`, `requirements` (Array of Strings), `location`, `salaryRange`, `status` (active/closed)
- `embeddedJD`: Vector representation of JD (updated by AI service)

### Application Schema (`Application`)
- `_id`, `jobId` (ref: Job), `applicantId` (ref: User)
- `resumeUrl`, `status` (applied, shortlisted, interviewed, rejected)
- `aiMatchScore`: Number (0-100)
- `atsReport`: Object (Missing skills, formatting score, etc.)

---

## 4. Backend APIs

### Authentication (`/api/auth`)
- `POST /register`: Register new user
- `POST /login`: JWT login
- `GET /google`: Google OAuth login

### Jobs (`/api/jobs`)
- `GET /`: List all jobs (with search/filter)
- `POST /`: Create a job (Recruiter/Admin)
- `GET /:id`: Job details
- `POST /:id/match`: Trigger AI Service to find best candidates

### Applications (`/api/applications`)
- `POST /apply/:jobId`: Submit application & resume (Triggers AI ATS Scoring)
- `GET /applicant/:userId`: List user's applications
- `GET /job/:jobId`: List applicants for a job (Recruiter)

### AI Service Proxy (`/api/ai`)
- Proxies requests to FastAPI for Mock Interviews, Skill Gap Analysis, etc.

---

## 5. Frontend Pages

### 1. Job Seeker Dashboard
- **Profile Page**: Update skills, view generated "Boost My Resume" suggestions.
- **Job Feed**: Semantically matched jobs based on resume embeddings.
- **Career Assistant**: Chat interface for the AI Mock Interview Generator and career guidance.
- **Course Recommendations**: Suggested courses to bridge identified skill gaps.

### 2. Recruiter Dashboard
- **Job Management**: Create, edit, and close job postings.
- **Applicant Tracking System (ATS)**: View candidates sorted by `aiMatchScore`.
- **Analytics**: Charts showing application trends, skill distribution among applicants.

### 3. Admin Panel
- **User Management**: Ban/Suspend users, manage roles.
- **Platform Analytics**: Total jobs, total matches, AI usage metrics.
- **System Health**: Monitor AI microservice uptime.

---

## 6. AI Workflow & Features Implementation

1. **Resume Parsing & Skill Extraction**:
   - Upload PDF/Docx -> Node.js uploads to S3 -> Sends S3 URL to FastAPI.
   - FastAPI downloads file, uses `spaCy` to extract Named Entities (Skills, Education, Experience).

2. **Semantic AI Job Matching**:
   - `Sentence Transformers` generates vector embeddings for both the Job Description and the extracted Resume Text.
   - Computes **Cosine Similarity** to return an `aiMatchScore`.

3. **ATS Resume Score & Skill Gap Analysis**:
   - Compares required skills in JD vs extracted skills in Resume.
   - Identifies missing skills -> FastAPI calls an LLM (or predefined DB) to map missing skills to "Course Recommendations".

4. **"Boost My Resume" & AI Mock Interview**:
   - Uses `Transformers` (e.g., LLaMA or OpenAI API) to suggest better bullet points for experiences.
   - Generates 5 dynamic interview questions based on the candidate's *weakest* matched skills to prepare them.

---

## 7. Deployment Steps

1. **Database Deployment**:
   - Provision a MongoDB Atlas Cluster.
   - Set up an AWS S3 Bucket for Resume/Image uploads.

2. **AI Service Deployment (FastAPI)**:
   - Containerize the `ai-service` using Docker.
   - Deploy the Docker container to a service like **Render**, **Railway**, or **AWS ECS** to ensure enough memory for NLP models.

3. **Backend Deployment (Node.js)**:
   - Configure environment variables (DB URI, JWT Secret, FastAPI Endpoint, AWS Keys).
   - Deploy to **Render**, **Heroku**, or **DigitalOcean App Platform**.

4. **Frontend Deployment (Next.js)**:
   - Push code to GitHub.
   - Import the `frontend` directory into **Vercel**.
   - Configure environment variables (`NEXT_PUBLIC_API_URL`).

---

## Next Steps

To begin building this project, we can initialize the codebases for the Frontend, Backend, and AI Service sequentially. 
