        // script.js - Lógica del Validador de Apuesta de Gabriel Molina


        // 1. Función auxiliar para quitar acentos y normalizar t

        function searchWiki() {
            const input = document.getElementById('searchInput').value.toLowerCase();
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (input.trim() === "") {
                resultsDiv.innerHTML = '<div class="no-results">Por favor, escribe un título para buscar.</div>';
                return;
            }

            // FILTRO: Solo coincidencia por TÍTULO de la A a la Z
            let filteredResults = wikiData.filter(item => 
                item.title.toLowerCase().includes(input)
            );

            filteredResults.sort((a, b) => a.title.localeCompare(b.title));

            if (filteredResults.length > 0) {
                filteredResults.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'wiki-item';
                    
                    div.innerHTML = `
                        <span class="status ${item.type || 'safe'}">${item.status}</span>
                        <div class="wiki-title">${item.title}</div>
                        <div class="wiki-content">${item.info}</div>
                        <div class="wiki-detail" title="Haz clic para copiar">${item.detail || "Información detallada no disponible."}</div>
                    `;
                    
                    // 1. Evento para abrir/cerrar el ítem
                    div.addEventListener('click', (e) => {
                        // Evitamos que se cierre si el clic fue específicamente en el detail para copiar
                        if (!e.target.classList.contains('wiki-detail')) {
                            div.classList.toggle('active');
                        }
                    });

                    // 2. Evento específico para COPIAR al portapapeles
                    const detailDiv = div.querySelector('.wiki-detail');
                    detailDiv.addEventListener('click', (e) => {
                        e.stopPropagation(); // Evita que el clic cierre el contenedor
                        
                        const textToCopy = detailDiv.innerText;
                        
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            // Feedback visual temporal
                            const originalText = detailDiv.innerText;
                            detailDiv.innerText = "¡Copiado al portapapeles! ✅";
                            detailDiv.style.color = "#27ae60";
                            
                            setTimeout(() => {
                                detailDiv.innerText = originalText;
                                detailDiv.style.color = "";
                            }, 1500);
                        }).catch(err => {
                            console.error('Error al copiar: ', err);
                        });
                    });

                    resultsDiv.appendChild(div);
                });
            } else {
                resultsDiv.innerHTML = `<div class="no-results">No se encontró el título "${input}".</div>`;
            }
        }

        // Extra: Permitir que funcione al presionar la tecla Enter
        document.getElementById('searchInput').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchWiki();
            }
        });

                    const filteredResults = wikiData.filter(item => 
                        item.title.toLowerCase().includes(input) || 
                        item.info.toLowerCase().includes(input)
                    );

                    if (filteredResults.length > 0) {
                        filteredResults.forEach(item => {
                            const div = document.createElement('div');
                            div.className = 'wiki-item';
                            div.innerHTML = `
                                <span class="status ${item.type}">${item.status}</span><br>
                                <a href="#" class="wiki-title">${item.title}</a>
                                ${item.info}
                            `;
                            resultsDiv.appendChild(div);
                        });
                    } else {
                        resultsDiv.innerHTML = '<div class="no-results">No se encontraron datos. Prueba con un mercado o estrategia valido.</div>';
                    }

                // Lógica de Modo Oscuro
                function toggleTheme() {
                    const body = document.body;
                    const btn = document.getElementById('themeToggle');
                    
                    body.classList.toggle('dark-mode');
                    
                    if (body.classList.contains('dark-mode')) {
                        localStorage.setItem('theme', 'dark');
                        btn.innerHTML = "☀️ Modo Claro";
                    } else {
                        localStorage.setItem('theme', 'light');
                        btn.innerHTML = "🌙 Modo Oscuro";
                    }
                }

                // Cargar preferencia al iniciar
                window.onload = () => {
                    if (localStorage.getItem('theme') === 'dark') {
                        document.body.classList.add('dark-mode');
                        document.getElementById('themeToggle').innerHTML = "☀️ Modo Claro";
                    }
                };

                // Escuchar tecla Enter
                document.getElementById('searchInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') searchWiki();
                });

                