export interface Visitor {
	visitor_id: number;
	visitor_fname: string;
	visitor_lname: string;
	visitor_email: string; // This will be the login
	visitor_password: string; // need to check how to encrypt the password
}
