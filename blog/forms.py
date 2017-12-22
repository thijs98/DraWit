from django import forms
from django import *
from .models import Post
from .models import Document

class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ('title', 'text')

class DocumentForm(forms.ModelForm):
    class Meta:
        model = Document
        fields = ('description', 'document', )
