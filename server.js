import express from "express";

import personagens from "./src/data/personagens.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  
  const htmlPage = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jornada pela Terra-média</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet">
        
        <style>
            /* Configurações globais */
            body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                overflow: hidden; /* Evita barras de rolagem */
                font-family: 'MedievalSharp', cursive; /* Fonte temática importada */
                color: #f0e6d2; /* Cor de pergaminho claro */
            }

            /* Container do fundo */
            #background-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1; /* Coloca o fundo atrás de todo o conteúdo */
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                /* Efeito de transição suave ao trocar de imagem */
                transition: background-image 1.5s ease-in-out;
            }

            /* Camada escura sobre o fundo para melhorar a legibilidade do texto */
            #background-container::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
            }

            /* Wrapper do conteúdo principal */
            .content-wrapper {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                text-align: center;
                padding: 20px;
            }

            /* Estilo do título principal */
            .title {
                font-size: 5rem; /* Tamanho grande */
                font-weight: normal;
                text-shadow: 2px 2px 10px #000;
                margin: 0;
                animation: fadeIn 3s ease-in-out;
            }

            /* Estilo do subtítulo */
            .subtitle {
                font-size: 1.8rem;
                margin-top: 10px;
                letter-spacing: 2px;
                text-shadow: 1px 1px 8px #000;
                animation: fadeIn 4s ease-in-out;
            }

            /* Animação para o texto aparecer suavemente */
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    </head>
    <body>
        <div id="background-container"></div>

        <div class="content-wrapper">
            <h1 class="title">Bem-vindo à Terra-média</h1>
            <p class="subtitle">A jornada está prestes a começar...</p>
        </div>

        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const backgroundContainer = document.getElementById('background-container');

                // IMPORTANTE: Como não temos arquivos locais, usamos URLs completas da internet.
                // Você pode trocar estas URLs por outras imagens que gostar.
                const images = [
                    'https://images.alphacoders.com/495/495795.jpg', // O Condado
                    'https://images.alphacoders.com/133/1330269.png', // Valfenda
                    'https://images.alphacoders.com/133/1333333.jpeg', // Argonath
                    'https://images.alphacoders.com/673/673322.jpg', // Minas Tirith
                    'https://images.alphacoders.com/132/1327178.jpeg'  // Mordor
                ];

                let currentIndex = 0;

                function changeBackground() {
                    let newIndex;
                    do {
                        newIndex = Math.floor(Math.random() * images.length);
                    } while (newIndex === currentIndex);
                    
                    currentIndex = newIndex;

                    const imageUrl = images[currentIndex];
                    backgroundContainer.style.backgroundImage = \`url('\${imageUrl}')\`;
                }

                // Muda o fundo imediatamente quando a página carrega
                changeBackground();

                // Define um intervalo para mudar o fundo a cada 10 segundos (10000 milissegundos)
                setInterval(changeBackground, 10000);
            });
        </script>
    </body>
    </html>
  `;
  
  res.send(htmlPage);

  
});


app.get("/personagens", (req, res) => {
  res.json(personagens);
});

app.listen(PORT, () => {
  console.log(
    `A API do mundo do senhor dos aneis está pelos horizontes https://localhost:${PORT}`
  );
});

app.get("/personagens/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const personagens = personagens.find((p) => p.id === id);

  if (personagens) {
    res.json({
      success: true,
      message: `personagem ${personagens.nome} encontrado! ⚡`,
      data: personagens,
    });
  } else {
    res.status(404).json({
      success: false,
      error: "Não existe esse personagem! 😢",
      message: `Nenhum personagem com ID ${id} foi encontrado`,
      codigo: "WINZARD_NOT_FOUND",
    });
  }
});

app.get("/personagens/nome/:nome", (req, res) => {
  let nome = req.params.nome;
  const personagensNome = personagens.find((p) =>
    p.nome.toLowerCase().includes(nome)
  );

  if (personagensNome) {
    res.status(200).json(personagensNome);
  } else {
    mensagem: "Esse personagem não existe 😢";
  }
});

app.get("/personagens", (req, res) => {
  res.json({
    success: true,
    message: "Todos os personagens do mundo do senhor dos aneis! 🏰",
    data: personagens,
    total: personagens.length,
    codigo: "WINZARD_NOT_FOUND",
  });
});

app.get("/personagens/raca/:raca", (req, res) => {
  let raca = req.params.raca;
  const personagensRaca = personagens.filter((p) =>
    p.raca.toLowerCase().includes(raca)
  );

  if (personagensRaca.length > 0) {
    res.status(200).json(personagensRaca);
  } else {
    res.status(404).json({
      mensagem: "Nenhum personagem se encontra nessa raça! 😢",
      codigo: "WINZARD_NOT_FOUND",
    });
  }
});

app.get("/personagens/vivos/sim", (req, res) => {
  
  const personagensVivos = personagens.filter(p => p.vivo === true);

  
  res.status(200).json({
    success: true,
    message: "Lista de personagens vivos da Terra-média! ✨",
    total: personagensVivos.length,
    data: personagensVivos,
  });
});