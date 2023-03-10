import { Post } from './post.interface';

export interface Comment {
	identifier: string;
	body: string;
	username: string;
	createdAt: string;
	updatedAt: string;
	post?: Post;

	userVote: string;
	voteScore: string;
}
