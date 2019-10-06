import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../../shared/post.service";
import { Post } from "../../shared/interfaces";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"]
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  constructor(private postServise: PostService) {}

  ngOnInit() {
    this.pSub = this.postServise.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  removePostId() {}
}
