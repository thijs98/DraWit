from django.shortcuts import render
from .models import Post

def main(request):
    return render(request, 'blog/main.html')

def instruction(request):
    return render(request, 'blog/instruction.html')
# Create your views here.
