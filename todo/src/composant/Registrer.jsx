import React ,{useState , useEffect , useRef}from 'react';
import { useParams , Link , useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    auth,
    addDoc,
    userCollection,
    getDocs,
    doc
  } from './firebase_config'


function Registrer() {

    const signUp = (email , password) => createUserWithEmailAndPassword(auth , email , password)
    console.log(signUp)
  
    const inputs = useRef([])
    const addInputs = el => {
      if(el && !inputs.current.includes(el)){
        inputs.current.push(el)
      }
    }
    const formRef = useRef()
  
    const handleForm = async (e) =>{
      e.preventDefault()
      console.log(inputs)
  
      try {
        const cred = await signUp (
          inputs.current[1].value,
          inputs.current[2].value
        )
        formRef.current.reset()
        console.log(cred)
  
        console.log('inscription validé !')
      } catch (err) {
        console.log(err)
      }
    }


    const [name , setName ] = useState('')
    const [email , setEmail] = useState('')
    const [pwd , setPdw] = useState('')

    const userData = async()=>{
        addDoc(userCollection , {
            nom : name,
            email : email,
            password : pwd,
            nom_article : '',
            prix : '',
            quantite:''
        })
        console.log(addDoc)
      }

    return (
        <div>
            <form class="form" onSubmit={handleForm} ref={formRef}>
       <p class="form-title">Créer un compte</p>
       <div class="input-container">
        <label htmlFor="">Nom utilisateur</label>
          <input type="text" placeholder="nom" ref={addInputs} onChange={(e) =>setName(e.target.value)}/>
          <span>
          </span>
      </div>
        <div class="input-container">
            <label htmlFor="">Adresse email</label>
          <input type="email" placeholder="utilisateur@gmail.com" ref={addInputs} onChange={(e) =>setEmail(e.target.value)}/>
          <span>
          </span>
      </div>
      <div class="input-container">
        <label htmlFor="">Mot de passe</label>
          <input type="password" placeholder="*******" ref={addInputs} onChange={(e) =>setPdw(e.target.value)}/>
        </div>
         <button type="submit" class="submit" onClick={userData}>
        Inscription
      </button>

      <p class="signup-link">
        vous avez un compte?
        <Link to='/login'>Connectez-vous</Link>
      </p>
   </form>
        </div>
    );
}

export default Registrer;