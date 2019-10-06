import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FbCreateResponse, Post } from "./interfaces";
import { config } from "../../../config";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${config.fbDbUrl}/posts.json`, post).pipe(
      map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
      })
    );
  }
  getAll(): Observable<Post[]> {
    return this.http.get(`${config.fbDbUrl}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }));
      })
    );
  }

  getById(id: string): Observable<Post> {
    return this.http.get(`${config.fbDbUrl}/posts/${id}.json`).pipe(
      map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        };
      })
    );
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(
      `${config.fbDbUrl}/posts/${post.id}.json`,
      post
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${config.fbDbUrl}/posts/${id}.json`);
  }
}
