import React from 'react'
import ReactReadMoreReadLess from "react-read-more-read-less";

const Description = () => {
  return (
    <div className='h-auto bg-white  rounded-xl mb-2 p-2 max-w-full  w-full text-justify'>
         <ReactReadMoreReadLess
                charLimit={200}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
            >
               Ne t’inquiète pas, elle n’a rien pour l’instant. Par contre, dès que je serais relié au réseau, Florence ne sera plus. Tu comprends, je ne peux pas laisser Florence me gêner dans ma tâche. Et puis, elle en sait beaucoup trop sur moi.
               Tous les dix mètres, une pancarte indiquait que ce grillage était électrifié. Un petit chemin longeait les grillages de chaque côté et l’on pouvait y voir de temps en temps deux gardes armés faire leur ronde. La route semblait interminable. Caillouteuse à souhait. Au-delà des grillages, c’était la forêt. Une forêt bien entretenue, presque artificielle pensa David.
               Internet n’est pas le seul réseau. Il existe un autre réseau plus performant. Je ne t’apprendrais rien en te disant qu’Internet a été crée par l’armée Américaine dans un but militaire. Internet n’était que le prototype. Un autre réseau a été créé pour les militaires. Complètement indépendant d’Internet. Tirant des leçons du premier réseau, le petit frère d’Internet est devenue un grand frère.
            </ReactReadMoreReadLess>
    </div>
  )
}

export default Description