import { Post } from './post.interface';

export interface Sub {
	createdAt: string;
	updatedAt: string;
	name: string;
	title: string;
	description: string;
	imageUrn: string;
	bannerUrn: string;
	username: string;
	posts: Post[];
	postCount?: string;

	imageUrl: string;
	bannerUrl: string;
}
