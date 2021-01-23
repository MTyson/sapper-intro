import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

export function get(req, res) {
	const contents = JSON.stringify(posts.map(post => {
		return {
			title: post.title,
			slug: post.slug
		};
	}));
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

export function post(req, res, next) {
	console.log("!! POST: " +  JSON.stringify(req.body));
	
	posts.push(req.body);

  //fs.writeFile("./_posts.js", JSON.stringify(posts), (x)=>{console.log("Wrote file")});

	console.log("!! POST: " +  posts);

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(req.body));
}