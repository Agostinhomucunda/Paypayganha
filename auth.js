import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const criarConta = document.getElementById('criarConta');
const login = document.getElementById('login');

criarConta.onclick = async () => {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const userCred = await createUserWithEmailAndPassword(auth, email, senha);

  await setDoc(doc(db, "users", userCred.user.uid), {
    nome: nome,
    saldo: 0,
    pontos: 0
  });

  window.location.href = "dashboard.html";
};

login.onclick = async () => {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  await signInWithEmailAndPassword(auth, email, senha);
  window.location.href = "dashboard.html";
};