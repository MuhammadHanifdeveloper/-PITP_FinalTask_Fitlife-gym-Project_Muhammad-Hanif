function loadComponent(elementID, componentPath) {
    fetch(componentPath)
        .then( response => response.text() )
        .then( data => document.getElementById(elementID).innerHTML = data )
}

loadComponent('header', './components/header.html');
loadComponent('footer', './components/footer.html');