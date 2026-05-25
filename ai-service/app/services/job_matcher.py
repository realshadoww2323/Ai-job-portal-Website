import spacy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load NLP Models (Note: download required: python -m spacy download en_core_web_sm)
try:
    nlp = spacy.load("en_core_web_sm")
except:
    pass # Add download logic or assume it is pre-downloaded

# Load Sentence Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_skills_with_spacy(text: str) -> list:
    """
    Extract Named Entities (Skills) using SpaCy.
    A more advanced implementation would use a custom trained NER model for skills.
    """
    doc = nlp(text)
    skills = []
    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT", "WORK_OF_ART", "GPE"]: 
            # In a real app, use a predefined skill list or custom trained NER
            skills.append(ent.text)
    return list(set(skills))

def calculate_match_score(resume_text: str, job_description: str) -> float:
    """
    Uses Sentence Transformers to encode the resume and job description into vectors,
    then calculates the Cosine Similarity to determine an ATS match score.
    """
    # 1. Encode Texts
    embeddings = model.encode([resume_text, job_description])
    
    # 2. Calculate Cosine Similarity
    # embeddings[0] is resume, embeddings[1] is JD
    similarity_matrix = cosine_similarity([embeddings[0]], [embeddings[1]])
    
    # 3. Convert to percentage score
    match_score = similarity_matrix[0][0] * 100
    
    # Keep score between 0 and 100
    return max(0.0, min(100.0, float(match_score)))

def analyze_skill_gaps(resume_skills: list, required_skills: list) -> list:
    """
    Compare extracted resume skills against required JD skills.
    """
    resume_skills_lower = [s.lower() for s in resume_skills]
    missing_skills = [skill for skill in required_skills if skill.lower() not in resume_skills_lower]
    return missing_skills
