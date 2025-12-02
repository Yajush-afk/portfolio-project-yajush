from pydantic import BaseModel
from typing import List, Optional

class Project(BaseModel):
    id: str
    title: str
    description: str
    tech_stack: List[str]
    github_link: Optional[str] = None
    demo_link: Optional[str] = None
    image_url: Optional[str] = None

class Achievement(BaseModel):
    id: str
    type: str
    title: str
    issuer: str
    date: str
    image_url: Optional[str] = None
    credential_link: Optional[str] = None

class SocialPost(BaseModel):
    content: str
    link: str
    date: str

class SocialPostsResponse(BaseModel):
    x_post: Optional[SocialPost] = None
    linkedin_post: Optional[SocialPost] = None
