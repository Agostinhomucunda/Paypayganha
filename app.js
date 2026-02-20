import { auth, db, storage } from './firebase-config.js';
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

let userId;

auth.onAuthStateChanged(async (user) => {
  if(user){
    userId = user.uid;

    const snap = await getDoc(doc(db,"users",userId));
    document.getElementById("nomeUser").innerText = snap.data().nome;
    document.getElementById("saldo").innerText = "Saldo: " + snap.data().saldo + " AOA";
    document.getElementById("pontos").innerText = "Pontos: " + snap.data().pontos;
  }
});

window.abrirInvest = () => {
  document.getElementById("conteudo").innerHTML = `
    <h3>Pacotes de Investimento</h3>

    <div class="plano">
      <p>Valor: 10.000 AOA</p>
      <p>Lucro: 35%</p>
      <p>Duração: 10 dias</p>
      <button onclick="depositar(10000)">Investir</button>
    </div>

    <div id="depositoArea"></div>
  `;
};

window.depositar = (valor) => {
  document.getElementById("depositoArea").innerHTML = `
    <p>Referência PayPay: +244951875350</p>

    <p>Multicaixa Express:</p>
    <ul>
      <li>Pagamentos</li>
      <li>Pagamento por referência</li>
      <li>Entidade: 10116</li>
      <li>Valor: ${valor}</li>
    </ul>

    <input type="file" id="comprovante">
    <button onclick="enviarComprovante(${valor})">Enviar comprovante</button>
    <p id="timer"></p>
  `;

  iniciarTimer(240);
};

function iniciarTimer(segundos){
  let tempo = segundos;
  const t = setInterval(()=>{
    document.getElementById("timer").innerText = "Tempo restante: " + tempo + "s";
    tempo--;
    if(tempo <= 0) clearInterval(t);
  },1000);
}

window.enviarComprovante = async (valor) => {
  const file = document.getElementById("comprovante").files[0];

  const storageRef = ref(storage, "comprovantes/"+Date.now());
  await uploadBytes(storageRef, file);

  await addDoc(collection(db,"deposits"),{
    userId,
    valor,
    status:"pending",
    data:Date.now()
  });

  setTimeout(async ()=>{
    const userRef = doc(db,"users",userId);
    const snap = await getDoc(userRef);
    await updateDoc(userRef,{
      saldo: snap.data().saldo + valor
    });
    alert("Saldo liberado!");
  },10000);
};

window.abrirVideos = () => {
  document.getElementById("conteudo").innerHTML = `
    <video id="video" width="100%" controls>
      <source src="videos/video1.mp4" type="video/mp4">
    </video>
  `;

  document.getElementById("video").onended = async () => {
    const userRef = doc(db,"users",userId);
    const snap = await getDoc(userRef);

    await updateDoc(userRef,{
      pontos: snap.data().pontos + 50
    });

    alert("Você ganhou 50 pontos!");
  };
};

window.abrirRecargas = () => {
  document.getElementById("conteudo").innerHTML = `
    <h3>Recargas</h3>

    <button onclick="raspar(500,1500)">500 Kz - 1500 pontos</button>
    <button onclick="raspar(1000,2500)">1000 Kz - 2500 pontos</button>
    <button onclick="raspar(2500,5000)">2500 Kz - 5000 pontos</button>
  `;
};

window.raspar = async (valor,pontosNec) => {
  const userRef = doc(db,"users",userId);
  const snap = await getDoc(userRef);

  if(snap.data().pontos >= pontosNec){
    await updateDoc(userRef,{
      pontos: snap.data().pontos - pontosNec
    });
    alert("Recarga liberada: " + valor + " Kz");
  }else{
    alert("Pontos insuficientes");
  }
};