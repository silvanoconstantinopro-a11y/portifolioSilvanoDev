document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chat-window");
  const optionsContainer = document.getElementById("options");

  // Perguntas e respostas estruturadas
  const respostas = {
    sobre: {
      "Quem é você?": "Sou Silvano Constantino, desenvolvedor Web e Mobile, apaixonado por criar soluções digitais modernas e eficientes.",
      "Qual é a sua experiência com programação?": "Tenho experiência de vários anos em desenvolvimento Front-end, Back-end, Mobile e integração com APIs.",
      "Quais linguagens você domina?": "Domino Dart, JavaScript, TypeScript, HTML, CSS e Python.",
      "Você já trabalhou em projetos grandes?": "Sim! Participei de projetos com Flutter, React e Node.js em ambientes reais de produção.",
      "Onde você estudou ou se formou?": "Sou formado em Engenharia de Software e tenho cursos especializados em desenvolvimento Web e Mobile."
    },
    projetos: {
      "Posso ver seus projetos?": "Claro! Podes conferir todos os projetos na página <a href='projetos.html'>Projetos</a>.",
      "Qual foi o seu projeto favorito?": "Um dos meus favoritos é o SmartFin, uma aplicação financeira inteligente com Flutter e Firebase.",
      "Você já trabalhou com [tecnologia específica]?": "Sim, trabalhei com Flutter, React, Node.js, Firebase e outras tecnologias modernas.",
      "Esse projeto é open source?": "Alguns dos meus projetos são open source e podem ser vistos no GitHub: <a href='https://github.com/seuusuario' target='_blank'>GitHub</a>.",
      "Você pode me mostrar algum código?": "Sim! Podes acessar os repositórios diretamente no meu GitHub."
    },
    colaboracao: {
      "Você faz freelance?": "Sim, aceito projetos freelance dependendo da complexidade e prazo.",
      "Quanto custa contratar você?": "O valor depende do projeto. Para mais detalhes, fale comigo diretamente no LinkedIn.",
      "Você aceita projetos de curto prazo?": "Sim, projetos curtos podem ser avaliados caso a caso.",
      "Você trabalha remotamente?": "Sim, posso trabalhar remotamente com qualquer equipe global.",
      "Podemos colaborar em um projeto juntos?": "Claro! Estou aberto a colaborações interessantes."
    },
    habilidades: {
      "Você faz front-end, back-end ou full-stack?": "Faço Full-stack, com forte experiência em front-end moderno e integração de back-end.",
      "Você conhece [framework/biblioteca]?": "Provavelmente! Trabalho com Flutter, React, Node.js, Firebase, entre outros.",
      "Tem experiência com banco de dados?": "Sim, tenho experiência com MySQL, PostgreSQL, Firebase e MongoDB.",
      "Você faz deploy em nuvem?": "Sim, faço deploy em Firebase, AWS, Heroku e Vercel.",
      "Você faz testes ou revisão de código?": "Sim, sigo boas práticas de testes unitários e revisão de código para garantir qualidade."
    },
    contato: {
      "Como posso falar com você diretamente?": "Podes falar comigo pelo LinkedIn: <a href='https://www.linkedin.com/in/silvano-constantino-b564b2341' target='_blank'>LinkedIn</a>. ou pelo meu whatsApp +244 953 130 223",
      "Você está disponível agora?": "Geralmente sim! Mas se não responder de imediato, podes me enviar uma mensagem pelo LinkedIn.",
      "Tem LinkedIn ou GitHub para eu seguir?": "Sim! LinkedIn: <a href='https://www.linkedin.com/in/silvano-constantino-b564b2341' target='_blank'>LinkedIn</a>, GitHub: <a href='https://github.com/' target='_blank'>GitHub</a> "
    }
  };

  const categorias = ["sobre", "projetos", "colaboracao", "habilidades", "contato"];

  // Perguntas iniciais sugeridas
  function menuInicial() {
    chatWindow.innerHTML += `<div class="bot-msg">Escolha uma categoria para começar 👇</div>`;
    optionsContainer.innerHTML = "";
    categorias.forEach(cat => {
      const btn = document.createElement("button");
      btn.classList.add("option-btn");
      btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      btn.dataset.cat = cat;
      btn.addEventListener("click", () => mostrarPerguntas(cat));
      optionsContainer.appendChild(btn);
    });
  }

  // Mostrar perguntas da categoria
  function mostrarPerguntas(categoria) {
    optionsContainer.innerHTML = "";
    Object.keys(respostas[categoria]).forEach(pergunta => {
      const btn = document.createElement("button");
      btn.classList.add("option-btn");
      btn.textContent = pergunta;
      btn.addEventListener("click", () => responderPergunta(categoria, pergunta));
      optionsContainer.appendChild(btn);
    });
  }

  // Responder a pergunta
  function responderPergunta(categoria, pergunta) {
    addMensagem("user-msg", pergunta);
    const resposta = respostas[categoria][pergunta];

    setTimeout(() => {
      addMensagem("bot-msg", resposta);
      // Perguntar se foi útil
      optionsContainer.innerHTML = `
        <button class="option-btn" data-resp="sim">Sim</button>
        <button class="option-btn" data-resp="nao">Não</button>
      `;

      document.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          if (btn.dataset.resp === "sim") {
            addMensagem("user-msg", "Sim");
            addMensagem("bot-msg", "Ótimo! 😊 Posso ajudar com outra pergunta?");
            setTimeout(menuInicial, 800);
          } else {
            addMensagem("user-msg", "Não");
            addMensagem("bot-msg", `Tudo bem! Se não consegui responder, entra em contacto comigo pelo <a href='https://linkedin.com/in/teu-perfil' target='_blank'>LinkedIn</a> 💼.`);
            setTimeout(menuInicial, 1200);
          }
        });
      });

    }, 600);
  }

  function addMensagem(classe, texto) {
    const div = document.createElement("div");
    div.classList.add(classe);
    div.innerHTML = texto;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Inicializa menu
  menuInicial();
});
