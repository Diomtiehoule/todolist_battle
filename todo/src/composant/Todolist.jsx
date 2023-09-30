import React, { useState , useEffect} from 'react';
import { database } from './firebase_config';
import './todolist.css'
import {uid} from 'uid'
import { useParams } from 'react-router-dom';
import { userCollection , getDocs , doc , updateDoc } from './firebase_config';
import { set , ref, onValue , remove, update} from 'firebase/database'

function Todolist() {

    const handleSubmitChange = () =>{
        update(ref(database , `${tempuuid}`) , {
          projet,
          cout,
          description,
          uuid : tempuuid,
        })
    
        setProjet('')
        setPrix('')
        setDescription('')
        setQuantite('')
        setIsEdit(false)
    
      }


    const [ tempuuid , setTempuuid] = useState('');
    const [isEdit , setIsEdit ] = useState(false)
    //edit
    const handleUpdate = (projet) => {
        setIsEdit(true);
        setTempuuid(projet.uuid);
      }

    //lire
    useEffect(() =>{
        onValue(ref(database) , snapshot => {
          setAllProjet([]);
          const data = snapshot.val()
          console.log(data)
          if(data !== null){
            Object.values(data).map(projet =>{
              setAllProjet((oldArray) => [...oldArray , projet])
            }) 
          
          }
        })
      }, [])


      const [allProjet , setAllProjet ] = useState([])
      const [projet , setProjet ] = useState('')
      const [quantite , setQuantite ] = useState('')
      const [prix , setPrix ] = useState(0)
      const [description , setDescription ] = useState('')
    //ecrire dans la base

    const writeDatabase = () => {
        const uuid = uid()
        set(ref(database , `${uuid}`),{
          projet,
          description,
          quantite,
          prix,
          uuid,
        });
    
        setProjet('')
        setQuantite('')
        setDescription('')
        setPrix('')
      }
      console.log('ok')

      const handleDelete = (projet) =>{
        remove(ref(database, `/${projet.uuid}`));

        console.log('okay')
      }

      const [userInfo , setUserInfo ] = useState({})
      let {id} = useParams();
      console.log('id' , id)
  
      async function GetInfosUser(id){
        try{
            const querySnapshot =  await getDocs(userCollection)
            for(const doc of querySnapshot.docs){
                const documentData = doc.data();
                const documentId = doc.id;
                if(id === documentId) {
                    setUserInfo(documentData);
                    console.log(userInfo)
                }
            }
            console.log('dashboard')
        }
        catch(err){
        console.log('erreur de recuperation')
    }
}

    useEffect(()=>{
        GetInfosUser(id)
    },[id]);
  
      console.log(userInfo)

    return (
        <div>
            <h1>Bienvenu , {userInfo.nom}</h1>
            <h1>Que devez vous faire en ce moment</h1>

         <div className="article">
            <div className="produit">
                <div className="nom">
                <label htmlFor="">nom de projet</label><br />
            <input type="text"  placeholder="Nom du produit" key={projet.uuid} onChange={(e) => {setProjet(e.target.value)}}/>
                </div>
            
            <div className="quantie">
            <label htmlFor="">description projet</label><br />
            <input type="text" name="" id="" placeholder="quantité produit" onChange={(e) => {setDescription(e.target.value)}}/>
            </div>
            
            <div className="quantite">
            <label htmlFor="">debut du projet</label><br />
            <input type="text" placeholder="debut de projet" onChange={(e) => {setQuantite(e.target.value)}}/>
            </div>

            <div className="prix">
            <label htmlFor="">fin projet</label><br />
            <input type="text" placeholder="fin projet" onChange={(e) => {setPrix(e.target.value)}}/>
            </div>
            
            </div>
            <button onClick={writeDatabase}>Créer le projet</button>
            
         </div>

         {allProjet.map((article) => {
            return (
            <>
            <div className="userArticle" key={article.uuid}>
            {/* <h1>{article.projet}</h1>
            <h2>{article.description}</h2>
            <h2>{article.quantite}</h2>
            <h2>{article.prix}</h2> */}
            {/* <button onClick={()=>handleDelete(article)}>supprimer</button> */}

            {/* {isEdit ? (
        <>
          <button onClick={handleSubmitChange}>mettre a jours</button>
          <button onClick={() => setIsEdit(false)}>X</button>
        </>
      ) : (
        <button onClick={writeDatabase}>valider</button>
      )
    } */}

<div class="card">
  <div class="card-header">
    <div class="text-header">Projet</div>
  </div>
  <div class="card-body">
    <form action="#">
      <div class="form-group">
        <h2><span>Nom du projet:</span> {article.projet}</h2><h3></h3>
        
        
      </div>
      <div class="form-group">
        <h2><span>Description:</span> {article.description}</h2>
      </div>
      <div class="form-group">
        <h2><span>debut:</span> {article.quantite}</h2>
        
      </div>
      <div class="form-group">
        <h2><span>durer:</span> {article.prix}</h2>
        
      </div>
     <input type="submit" class="btn" value="supprimer" onClick={()=>handleDelete(article)}/>
     <input type="submit" class="btn" value="modifier" />
         </form>
  </div>
</div>


            </div>
            
            </>
            )
            
         })}
        </div>

        
    );
}

export default Todolist;