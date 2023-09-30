import './login.css'
import React , {useState , useRef, useEffect }from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth,getDocs, userCollection , doc} from './firebase_config.js';
import { Link , useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate()
    const [formLogin , setFormLogin ] = useState({
          email : "",
          password : ""
      });
  
      const { email , password} = formLogin;
  
    const handleChange = (e)=>{
      setFormLogin({
          ...formLogin,
          [e.target.name]: e.target.value
      });
  };
  
    const handleLogin = async (e)=>{
      e.preventDefault();
  
      const userId = await recupereDocumentId(userCollection, formLogin.email, formLogin.password);
  
      signInWithEmailAndPassword(auth , formLogin.email , formLogin.password)
      .then((userCredential) =>{
            navigate(`/todolist/${userId}`)
      })
      .catch((e) =>{
          console.log("vous n'avez pas de compte");
      });
  };
  
    async function recupereDocumentId (userCollection , email , password){
      try {
          const querySnapshot = await getDocs(userCollection);
          for(const doc of querySnapshot.docs){
              const documentData = doc.data()
              const documentId = doc.id;
              if(documentData.email === email && documentData.password === password){
                  console.log(documentId, 'only id')
                  return documentId;
              }
          }
          console.log('aucun document trouvé avec les identifiants')
          return null
      } catch(err){
          console.log(err)
          return null
      }
  }

    return (
        <div>
            
    <form class="form" onSubmit={handleLogin}>
       <p class="form-title">Connectez-vous à votre compte</p>
        <div class="input-container">
          <input type="email" placeholder="utilisateur@gmail.com"  name='email' value={email} onChange={handleChange}/>
          <span>
          </span>
      </div>
      <div class="input-container">
          <input type="password" placeholder="*******" name='password' onChange={handleChange} value={password} />
        </div>
         <button type="submit" class="submit">
        Connexion
      </button>

      <p class="signup-link">
        pas de compte?
        <Link to='/' >Inscrivez-vous</Link>
      </p>
   </form>

        </div>
    );
}

export default Login;