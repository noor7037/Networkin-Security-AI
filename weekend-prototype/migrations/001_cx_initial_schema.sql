-- Migration: 001_cx_initial_schema.sql
-- Description: Core consumer tables for NetCyberAI Consumer Learning App
-- All tables are strictly prefixed with cx_ and keyed per child/parent

-- 1. Parent Accounts
CREATE TABLE IF NOT EXISTS cx_parent_accounts (
    id VARCHAR(64) PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    locale VARCHAR(10) NOT NULL DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Child Profiles (Multi-child per parent)
CREATE TABLE IF NOT EXISTS cx_child_profiles (
    id VARCHAR(64) PRIMARY KEY,
    parent_id VARCHAR(64) NOT NULL REFERENCES cx_parent_accounts(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    avatar VARCHAR(64) NOT NULL DEFAULT 'avatar_1',
    grade_level INTEGER NOT NULL CHECK (grade_level BETWEEN 1 AND 12),
    board VARCHAR(50) NOT NULL DEFAULT 'CBSE',
    medium VARCHAR(20) NOT NULL DEFAULT 'english',
    stars_xp INTEGER NOT NULL DEFAULT 0,
    streak_days INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Syllabus Profiles
CREATE TABLE IF NOT EXISTS cx_syllabus_profiles (
    id VARCHAR(64) PRIMARY KEY,
    child_id VARCHAR(64) NOT NULL REFERENCES cx_child_profiles(id) ON DELETE CASCADE,
    version INTEGER NOT NULL DEFAULT 1,
    board VARCHAR(50) NOT NULL,
    grade_level INTEGER NOT NULL,
    subjects JSONB NOT NULL DEFAULT '{}'::jsonb,
    raw_ocr_text TEXT,
    confidence NUMERIC(4, 2) NOT NULL DEFAULT 1.0,
    clarifying_question TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'verified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Day-wise Study Plans
CREATE TABLE IF NOT EXISTS cx_study_plans (
    id VARCHAR(64) PRIMARY KEY,
    child_id VARCHAR(64) NOT NULL REFERENCES cx_child_profiles(id) ON DELETE CASCADE,
    exam_date DATE NOT NULL,
    days JSONB NOT NULL DEFAULT '[]'::jsonb,
    reflow_count INTEGER NOT NULL DEFAULT 0,
    last_reflowed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Quizzes
CREATE TABLE IF NOT EXISTS cx_quizzes (
    id VARCHAR(64) PRIMARY KEY,
    child_id VARCHAR(64) NOT NULL REFERENCES cx_child_profiles(id) ON DELETE CASCADE,
    subject VARCHAR(60) NOT NULL,
    chapter VARCHAR(120) NOT NULL,
    topic VARCHAR(120) NOT NULL,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    score INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 5,
    weak_topics JSONB NOT NULL DEFAULT '[]'::jsonb,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Learning Vault Entries (Lifetime timeline)
CREATE TABLE IF NOT EXISTS cx_vault_entries (
    id VARCHAR(64) PRIMARY KEY,
    child_id VARCHAR(64) NOT NULL REFERENCES cx_child_profiles(id) ON DELETE CASCADE,
    entry_type VARCHAR(40) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    badge_icon VARCHAR(60) NOT NULL DEFAULT 'star',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Opportunities & Schemes
CREATE TABLE IF NOT EXISTS cx_opportunities (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    eligible_grades JSONB NOT NULL DEFAULT '[]'::jsonb,
    eligible_states JSONB NOT NULL DEFAULT '["All India"]'::jsonb,
    deadline VARCHAR(100),
    benefit_summary TEXT NOT NULL,
    official_url TEXT NOT NULL,
    last_verified_on VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'verified',
    founder_review_status VARCHAR(30) NOT NULL DEFAULT 'approved',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. School Connections (Governed ERP link)
CREATE TABLE IF NOT EXISTS cx_school_connections (
    id VARCHAR(64) PRIMARY KEY,
    parent_id VARCHAR(64) NOT NULL REFERENCES cx_parent_accounts(id) ON DELETE CASCADE,
    child_id VARCHAR(64) NOT NULL REFERENCES cx_child_profiles(id) ON DELETE CASCADE,
    school_name VARCHAR(255) NOT NULL,
    student_school_id VARCHAR(64) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'connected',
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    disconnected_at TIMESTAMP WITH TIME ZONE,
    retained_data_summary JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- 9. Notifications
CREATE TABLE IF NOT EXISTS cx_notifications (
    id VARCHAR(64) PRIMARY KEY,
    parent_id VARCHAR(64) NOT NULL REFERENCES cx_parent_accounts(id) ON DELETE CASCADE,
    child_id VARCHAR(64) REFERENCES cx_child_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid per-child retrieval
CREATE INDEX IF NOT EXISTS idx_cx_child_profiles_parent ON cx_child_profiles(parent_id);
CREATE INDEX IF NOT EXISTS idx_cx_syllabus_child ON cx_syllabus_profiles(child_id);
CREATE INDEX IF NOT EXISTS idx_cx_study_plans_child ON cx_study_plans(child_id);
CREATE INDEX IF NOT EXISTS idx_cx_quizzes_child ON cx_quizzes(child_id);
CREATE INDEX IF NOT EXISTS idx_cx_vault_child ON cx_vault_entries(child_id);
CREATE INDEX IF NOT EXISTS idx_cx_notifications_child ON cx_notifications(child_id);
CREATE INDEX IF NOT EXISTS idx_cx_school_conn_child ON cx_school_connections(child_id);
