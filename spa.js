
const app={
	pages:[],
	show:new Event('show'), //making custom event when the page is shown gonna dispatch the event
	init:function(){
		app.pages=document.querySelectorAll('.container');
		/*
		app.pages.forEach((pg)=>{
			pg.addEventListener('show',app.pageShown);
		})
		*/
		document.querySelectorAll('.list__item__navlink').forEach((link)=>{
			link.addEventListener('click',app.nav);
		})
		history.replaceState({}, 'Home','#home'); //link in verchin mase gaveltsnenk #home
		window.addEventListener('hashchange',app.poppin); //back gojagin hamar
	},
	nav(ev){
		ev.preventDefault();
		let currentPage=ev.target.getAttribute('data-target');
		document.querySelector('.active').classList.remove('active');
		document.getElementById(currentPage).classList.add('active'); 
		history.pushState({}, currentPage,`#${currentPage}`);
		document.getElementById(currentPage).dispatchEvent(app.show);
	},
	/*
	pageShown(ev){
		console.log('container',ev.target.id,'just shown');
	},
	*/
	poppin(ev){
		console.log(location.hash,'popstate event');
		let hash = location.hash.replace('#','');
		document.querySelector('.active').classList.remove('active');
		document.getElementById(hash).classList.add('active'); 
		document.getElementById(hash).dispatchEvent(app.show);
	}  
};
document.addEventListener('DOMContentLoaded',app.init);

document.getElementById('getPosts').addEventListener('click',getPosts);

function getPosts(){
	fetch('https://jsonplaceholder.typicode.com/posts')
	.then((res)=>res.json())
	.then((data)=>{
		let output='<h2 class="conatiner__output__title">Posts</h2>';
		data.forEach(function(post){
			output+=`
				<div class="output__texts">
					<h3 class="output__texts__title">${post.title}</h3>
					<p class="output__texts__body">${post.body}</p>
				</div>
			`;
		});
		document.getElementById('conatiner__output').innerHTML=output;
	})
}







