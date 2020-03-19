
var app = new Vue({
    el: '#app',
    data: {
        errorMsg: "",
        successMsg: "",
        showAddModal:false,
        showEditModal:false,
        showDeleteModal:false,

        user: [],
        newUser: {nama: "", mail:"", phone:""},
        currentUser: {}

    },
        mounted: function(){
            this.getAllUser();
        },

        methods: {
            getAllUser(){
                axios.get("http://localhost/CRUD_Vue_js/proses.php?action=read").then(function(response){
                    if(response.data.error){
                        app.errorMsg = response.data.massage;

                    }
                    else{
                        app.user = response.data.user;
                    }
                });
            },
            addUser() {
                    var FormData = app.toFormdata(app.newUser);
                    axios.post("http://localhost/CRUD_Vue_js/proses.php?action=create", FormData).then(function(response){
                    app.newUser= {nama: "", mail:"", phone:""};    
                    if(response.data.error){
                            app.errorMsg = response.data.massage;
    
                        }
                        else{
                            app. successMsg = response.data.massage;
                            app.getAllUser();
                        }
                    });
            },

            updateUser() {
                var FormData = app.toFormdata(app.currentUser);
                axios.post("http://localhost/CRUD_Vue_js/proses.php?action=update", FormData).then(function(response){
                app.currentUser = {};    
                if(response.data.error){
                        app.errorMsg = response.data.massage;

                    }
                    else{
                        app. successMsg = response.data.massage;
                        app.getAllUser();
                    }
                });
        },

        deleteUser() {
            var FormData = app.toFormdata(app.currentUser);
            axios.post("http://localhost/CRUD_Vue_js/proses.php?action=delete", FormData).then(function(response){
            app.currentUser = {};    
            if(response.data.error){
                    app.errorMsg = response.data.massage;

                }
                else{
                    app. successMsg = response.data.massage;
                    app.getAllUser();
                }
            });
        },
                toFormdata(obj){
                    var fd = new FormData();
                    for(var i in obj){
                        fd.append(i,obj[i]);
                    }
                    return fd;
                },
                selectUser(user){
                    app.currentUser = user;
                },
                clearMsg(){
                    app.errorMsg ="";
                    app.successMsg ="";
                }
        }
   
});