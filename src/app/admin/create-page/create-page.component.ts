import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Post } from "../../shared/interfaces";
import { PostService } from "../../shared/post.service";

@Component({
  selector: "app-create-page",
  templateUrl: "./create-page.component.html",
  styleUrls: ["./create-page.component.scss"]
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    }
    const { title, text, author } = this.form.value;
    const post: Post = {
      title,
      text,
      author,
      date: new Date()
    };
    this.postService.create(post).subscribe(() => {
      this.form.reset();
    });
  }
}
