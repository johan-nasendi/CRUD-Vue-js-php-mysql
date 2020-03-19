<?php
 $conn = new mysqli("localhost", "johan","kopi", "crud_vue");
    if($conn->connect_error) {
        die("Koneksi Down".$conn->connect_error);
    }
    $result = array('error'=>false);
    $action='';

        if(isset($_GET['action'])){
            $action = $_GET['action'];
        }

        if($action=='read'){
            $sql = $conn->query("select * from user");
            $user = array();
            while($row = $sql->fetch_assoc()){
                array_push($user, $row);
            }
                $result['user'] = $user;
        }
// create

        if($action=='create'){
            $nama = $_POST['nama'];
            $mail = $_POST['mail'];
            $phone = $_POST['phone'];
             $sql = $conn->query("INSERT INTO user (nama,mail,phone) Values('$nama','$mail','$phone') ");
                if($sql){
                    $result['massage']="User Added Successfully";
                }
                    else{
                        $result['error'] =true;
                        $result['massage']=" Failde to Add Your User";
                    }
                 }
// Update
                 if($action=='update'){
                     $id = $_POST['id'];
                    $nama = $_POST['nama'];
                    $mail = $_POST['mail'];
                    $phone = $_POST['phone'];
                    $sql = $conn->query("UPDATE user set nama='$nama', mail='$mail', phone='$phone' where id='$id'");
                        if($sql){
                            $result['massage']="User Update Successfully";
                        }
                            else{
                                $result['error'] =true;
                                $result['massage']=" Failde to Update Your User";
                            }
                         }
//   Delete
                    if($action=='delete'){
                        $id = $_POST['id'];
                    $sql = $conn->query("DELETE from user  where id='$id'");
                        if($sql){
                            $result['massage']="User Deleted Successfully";
                        }
                            else{
                                $result['error'] =true;
                                $result['massage']=" Failde to Delete Your User";
                            }
                            }

                 $conn->close();                   
                echo json_encode($result);
?>