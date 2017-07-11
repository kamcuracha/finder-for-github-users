jQuery(document).ready(function($) {
    var util = {
        Global: {
            init: function() {
                this.githubCall();
            },
            githubCall: function() {
                $('#searchUser').on('keyup', function(e) {
                    let username = $(this).val();

                    $.ajax({
                        url: 'https://api.github.com/users/'+username,
                        type: 'GET',
                        data: {
                            client_id: '',
                            client_secret: ''
                        },
                    })
                    .done(function(user) {
                        $.ajax({
                            url: 'https://api.github.com/users/'+username+'/repos',
                            type: 'GET',
                            data: {
                                client_id: '',
                                client_secret: '',
                                sort: 'created: asc',
                                per_page: 5
                            },
                        })
                        .done(function(repos) {
                            if(repos.length > 0) {
                                $('.section-repos .container').html(`
                                        <h3>Available Repos</h3>
                                `);
                                $.each(repos, function(index, repo) {
                                    $('.section-repos .container').append(`
                                        <div class="well">
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <strong>${repo.name}</strong>: ${repo.description}
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="label label-default">Forks: ${repo.forks_count}</div>
                                                    <div class="label label-primary">Watchers: ${repo.watchers_count}</div>
                                                    <div class="label label-success">Stars: ${repo.stargazers_count}</div>
                                                </div>
                                                <div class="col-sm-2"> 
                                                    <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo Page</a>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                });
                            }
                            else {
                                $('.section-repos .container').html(`
                                        <h3>No availale repos found.</h3>
                                `);
                            }
                        })
                        .fail(function(repos) {})
                        .always(function(repos) {});
                        
                        $('.section-result .container').html(`
                            <div class="panel panel-default">
                              <div class="panel-heading">
                                <h3 class="panel-title">${!!user.name ? user.name : '<i>'+user.login+'</i>'}</h3>
                              </div>
                              <div class="panel-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <img class="img-responsive thumbnail" src="${user.avatar_url}" alt="" />
                                        <div class="pb2 text-center">
                                            <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                                        </div>
                                    </div>
                                    <div class="col-sm-9">
                                        <span class="label label-default">Public Repos: ${user.public_repos}</span>
                                        <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                                        <span class="label label-success">Followers: ${user.followers}</span>
                                        <span class="label label-info">Following: ${user.following}</span>
                                        <br><br>
                                        <ul class="list-group">
                                            <li class="list-group-item">Company: ${user.company}</li>
                                            <li class="list-group-item">Website: ${user.blog}</li>
                                            <li class="list-group-item">Location: ${user.location}</li>
                                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                                        </ul>
                                    </div>
                                </div>
                              </div>
                            </div>
                            <br><br>
                            <section class="section section-repos">
                                <div class="container"></div>
                            </section>
                            <br><br>
                        `);
                    })
                    .fail(function(user) {
                        $('.section-result .container').html(`
                            <div class="alert alert-danger" role="alert">
                                ${user.responseJSON.message} <br> Please visit this link: <a target="_blank" href="${user.responseJSON.documentation_url}">${user.responseJSON.documentation_url}</a>
                            </div>
                        `);
                    })
                    .always(function(user) {});
                    
                });
            }
        }
    };
    util.Global.init();
});