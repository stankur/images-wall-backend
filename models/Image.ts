interface Image {
	id: string;
	key: string;
	created_at: string;
	updated_at: string;
}

interface SignedImage extends Image {
	image_url: string;
}

export default Image;

export { SignedImage };
