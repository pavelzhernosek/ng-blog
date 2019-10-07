import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../../shared/post.service";
import { Post } from "../../shared/interfaces";
import { Subscription } from "rxjs";
import { AlertService } from "../shared/services/alert-service";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"]
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  searchStr: string = "";
  pSub: Subscription;
  dSub: Subscription;
  constructor(
    private postService: PostService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    } else if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.warning("deleted post");
    });
  }
}
