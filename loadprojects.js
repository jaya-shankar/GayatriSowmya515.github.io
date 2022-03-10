function loadProjects(projects){
    // first fetch project details
    // console.log(projects)
    projects.forEach(function(project){
       
        var proj_details = fetchProject(project.url)
       
        // console.log(project.img)
    })

}

function fetchProject(url) {
    // "https://github.com/jaya-shankar/Human-Development-Prediction" should be converted to following
    // "https://api.github.com/repos/jaya-shankar/Human-Development-Prediction"
    url = url.slice(0, 8) + "api." + url.slice(8,18) + "/repos" + url.slice(18);
    
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            var project = {
                name: data.name,
                description: data.description,
            }
            // console.log(project)
            return project;
        })
        .catch(error => console.log(error));
}


function loadProfiles(profiles){

    logos = fetchLogos()
    profiles.forEach(function(profile){
        batch = generate_profile_code(profile, logos)
        insertBatch(batch)
        
    })

}


function generate_profile_code(profile, logos){
    profile["lower_title"] = profile.title.toLowerCase()
    var profile_code = `<div class="sicons-${profile.lower_title}" data-scroll>
        <a href="${profile.url}" aria-label="${profile.title}">
            <svg fill="#dddddd" xmlns="http://www.w3.org/2000/svg" viewBox="${logos[profile.title].viewBox}" width="${logos[profile.title].width}" height="${logos[profile.title].height}">
                <title>${profile.title}</title>
                <path id="logo"
                    d="${logos[profile.title].d}" />
            </svg>
        </a>

    </div>`
    console.log(profile_code)
    return profile_code
}

function insertBatch(batch){
    var div = document.getElementById('social_profiles')
    div.innerHTML += batch
}

function fetchLogos() {
    logos = {
        "LinkedIn"  : {d        : "M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065 c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z",
                        viewBox : "0 0 30 30",
                        width   : "27px",
                        height  : "27px" 
                    },
        "Github"    : {d        : "M44,24c0,8.96-5.88,16.54-14,19.08V38c0-1.71-0.72-3.24-1.86-4.34c5.24-0.95,7.86-4,7.86-9.66c0-2.45-0.5-4.39-1.48-5.9 c0.44-1.71,0.7-4.14-0.52-6.1c-2.36,0-4.01,1.39-4.98,2.53C27.57,14.18,25.9,14,24,14c-1.8,0-3.46,0.2-4.94,0.61 C18.1,13.46,16.42,12,14,12c-1.42,2.28-0.84,4.74-0.3,6.12C12.62,19.63,12,21.57,12,24c0,5.66,2.62,8.71,7.86,9.66 c-0.67,0.65-1.19,1.44-1.51,2.34H16c-1.44,0-2-0.64-2.77-1.68c-0.77-1.04-1.6-1.74-2.59-2.03c-0.53-0.06-0.89,0.37-0.42,0.75 c1.57,1.13,1.68,2.98,2.31,4.19C13.1,38.32,14.28,39,15.61,39H18v4.08C9.88,40.54,4,32.96,4,24C4,12.95,12.95,4,24,4 S44,12.95,44,24z",
                        viewBox : "0 0 48 48",
                        width   : "30px",
                        height  : "30px"
                    },
        "HackerEarth": {d        :"M27.979 0.005h-15.301v8.656h0.145c1.12-1.437 2.953-2.125 4.745-1.776l-0.032-0.005c2.62 0.193 5.213 1.781 5.36 6.875v10.073c-0.011 0.208-0.177 0.375-0.38 0.385h-2.819c-0.208 0-0.38-0.172-0.38-0.385v-9.76c0-2.371-0.781-4.151-3.12-4.151h-0.052c-2.009 0-3.599 1.697-3.468 3.703v-0.011 10.219c0 0.213-0.172 0.385-0.38 0.385h-2.797c-0.213 0-0.385-0.172-0.385-0.385v-23.823h-4.948c-1.093 0-1.989 0.869-2.031 1.959v27.979c0.041 1.145 0.973 2.057 2.119 2.063h23.724c1.1-0.032 1.953-0.969 1.885-2.068v0.005-27.979c0.068-1.057-0.776-1.959-1.837-1.959l-0.048 0.005zM24.588 27.979h-17.181v-1.765h17.181z",
                        viewBox : "0 0 30 30",
                        width   : "24.5px",
                        height  : "24.5px"
                    },  
        "CodePen"   : {d        : "M 16 2.84375 L 15.4375 3.21875 L 3.4375 11.25 L 3 11.53125 L 3 20.46875 L 3.4375 20.75 L 15.4375 28.78125 L 16 29.15625 L 16.5625 28.78125 L 28.5625 20.75 L 29 20.46875 L 29 11.53125 L 28.5625 11.25 L 16.5625 3.21875 Z M 15 5.90625 L 15 11.34375 L 9.84375 14.8125 L 5.8125 12.09375 Z M 17 5.90625 L 26.1875 12.09375 L 22.15625 14.8125 L 17 11.34375 Z M 16 13.09375 L 20.34375 16 L 16 18.90625 L 11.65625 16 Z M 5 13.9375 L 8.0625 16 L 5 18.0625 Z M 27 13.9375 L 27 18.0625 L 23.9375 16 Z M 9.875 17.1875 L 15 20.65625 L 15 26.09375 L 5.8125 19.90625 Z M 22.125 17.1875 L 26.1875 19.90625 L 17 26.09375 L 17 20.65625 Z",
                        viewBox : "0 0 32 32",
                        width   : "30px",
                        height  : "30px"
                    },
        "HackerRank": {d        :"M 15.998047 3 C 14.225047 3 5.5352031 7.9839062 4.6582031 9.5039062 C 3.7802031 11.024906 3.7802031 20.983047 4.6582031 22.498047 C 5.5392031 24.017047 14.229047 29 15.998047 29 C 17.762047 29 26.451938 24.019953 27.335938 22.501953 C 28.222938 20.979953 28.222938 11.014047 27.335938 9.4980469 L 27.335938 9.4960938 C 26.444937 7.9790937 17.756047 3 15.998047 3 z M 15.996094 5.0117188 C 17.693094 5.3647187 24.417703 9.2167656 25.595703 10.509766 C 26.135703 12.150766 26.134703 19.844281 25.595703 21.488281 C 24.425703 22.779281 17.695094 26.636281 15.996094 26.988281 C 14.298094 26.638281 7.5723906 22.783234 6.4003906 21.490234 C 5.8653906 19.842234 5.8653906 12.155766 6.4003906 10.509766 C 7.5693906 9.2167656 14.297094 5.3617187 15.996094 5.0117188 z M 13 9 L 11 11 L 12 11 L 12 21 L 14 21 L 14 17 L 18 17 L 18 21 L 17 21 L 19 23 L 21 21 L 20 21 L 20 12 L 18 12 L 18 15 L 14 15 L 14 11 L 15 11 L 13 9 z",
                        viewBox : "0 0 32 32",
                        width   : "32px",
                        height  : "32px"
                    }
    }
    return logos
    
}