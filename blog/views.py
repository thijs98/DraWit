from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.shortcuts import render
from django.utils import timezone
from .forms import PostForm
from .models import Post

def main(request):
    return render(request, 'blog/main.html')

def instruction(request):
    return render(request, 'blog/instruction.html')

def share(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')
    return render(request, 'blog/share.html', {'posts': posts})

def login(request):
    return render(request, 'blog/registration/login.html')

def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect('share')
    else:
        form = PostForm()
    return render(request, 'blog/post_edit.html', {'form': form})

def model_form_upload(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('share')
    else:
        form = DocumentForm()
    return render(request, 'blog/post_edit.html', {
        'form': form
    })
