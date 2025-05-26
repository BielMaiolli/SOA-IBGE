let currentChart = null;

function showTab(tabName) {
    // Remove active from all tabs and contents
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function showLoading(elementId) {
    document.getElementById(elementId).classList.add('show');
}

function hideLoading(elementId) {
    document.getElementById(elementId).classList.remove('show');
}

function showError(message, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<div class="error">❌ ${message}</div>`;
    container.style.display = 'block';
}

async function searchEvolution() {
    const name = document.getElementById('evolutionName').value.trim();
    const startDecade = document.getElementById('startDecade').value;
    const endDecade = document.getElementById('endDecade').value;

    if (!name) {
        alert('Por favor, digite um nome');
        return;
    }

    showLoading('evolutionLoading');
    document.getElementById('evolutionResults').style.display = 'none';

    try {
        let url = `/api/name-evolution?name=${encodeURIComponent(name)}`;
        if (startDecade) url += `&startDecade=${startDecade}`;
        if (endDecade) url += `&endDecade=${endDecade}`;

        const response = await fetch(url);
        const data = await response.json();

        hideLoading('evolutionLoading');

        if (data && data[0] && data[0].res) {
            displayEvolutionChart(data[0], name);
        } else {
            showError('Nenhum dado encontrado para este nome', 'evolutionResults');
        }
    } catch (error) {
        hideLoading('evolutionLoading');
        showError('Erro ao buscar dados. Tente novamente.', 'evolutionResults');
    }
}

function displayEvolutionChart(data, name) {
    const results = document.getElementById('evolutionResults');
    results.style.display = 'block';

    if (currentChart) {
        currentChart.destroy();
    }

    const ctx = document.getElementById('evolutionChart').getContext('2d');
    
    const decades = data.res.map(item => item.periodo + 's');
    const frequencies = data.res.map(item => item.frequencia);

    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: decades,
            datasets: [{
                label: `Frequência do nome "${name}"`,
                data: frequencies,
                borderColor: 'rgb(102, 126, 234)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Evolução do nome "${name}" ao longo das décadas`
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequência'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Décadas'
                    }
                }
            }
        }
    });
}

async function searchLocation() {
    const location = document.getElementById('locationSelect').value;

    if (!location) {
        alert('Por favor, selecione uma localidade');
        return;
    }

    showLoading('locationLoading');
    document.getElementById('locationResults').style.display = 'none';

    try {
        const response = await fetch(`/api/location-names?localidade=${location}`);
        const data = await response.json();

        hideLoading('locationLoading');

        if (data && data.length > 0) {
            displayLocationTable(data, location);
        } else {
            showError('Nenhum dado encontrado para esta localidade', 'locationResults');
        }
    } catch (error) {
        hideLoading('locationLoading');
        showError('Erro ao buscar dados. Tente novamente.', 'locationResults');
    }
}

function displayLocationTable(data, location) {
    const results = document.getElementById('locationResults');
    
    let tableHtml = `
        <h4>🏆 Top 3 nomes mais frequentes em ${location}</h4>
        <table>
            <thead>
                <tr>
                    <th>Posição</th>
                    <th>Nome</th>
                    <th>Frequência</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach((item, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        tableHtml += `
            <tr>
                <td>${medal} ${index + 1}º</td>
                <td>${item.nome}</td>
                <td>${item.frequencia.toLocaleString()}</td>
            </tr>
        `;
    });

    tableHtml += '</tbody></table>';
    results.innerHTML = tableHtml;
    results.style.display = 'block';
}

async function compareNames() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();

    if (!name1 || !name2) {
        alert('Por favor, digite ambos os nomes');
        return;
    }

    showLoading('compareLoading');
    document.getElementById('compareResults').style.display = 'none';

    try {
        const response = await fetch(`/api/compare-names?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`);
        const data = await response.json();

        hideLoading('compareLoading');

        if (data.name1.data[0] && data.name2.data[0]) {
            displayCompareChart(data);
        } else {
            showError('Dados insuficientes para comparação', 'compareResults');
        }
    } catch (error) {
        hideLoading('compareLoading');
        showError('Erro ao buscar dados. Tente novamente.', 'compareResults');
    }
}

function displayCompareChart(data) {
    const results = document.getElementById('compareResults');
    results.style.display = 'block';

    if (currentChart) {
        currentChart.destroy();
    }

    const ctx = document.getElementById('compareChart').getContext('2d');
    
    // Processar dados do primeiro nome
    const data1 = data.name1.data[0].res || [];
    const data2 = data.name2.data[0].res || [];
    
    // Criar conjunto de todas as décadas
    const allDecades = [...new Set([
        ...data1.map(item => item.periodo),
        ...data2.map(item => item.periodo)
    ])].sort();

    const decades = allDecades.map(d => d + 's');
    
    // Mapear frequências para cada década
    const freq1 = allDecades.map(decade => {
        const found = data1.find(item => item.periodo === decade);
        return found ? found.frequencia : 0;
    });
    
    const freq2 = allDecades.map(decade => {
        const found = data2.find(item => item.periodo === decade);
        return found ? found.frequencia : 0;
    });

    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: decades,
            datasets: [{
                label: data.name1.name,
                data: freq1,
                borderColor: 'rgb(102, 126, 234)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                tension: 0.4
            }, {
                label: data.name2.name,
                data: freq2,
                borderColor: 'rgb(118, 75, 162)',
                backgroundColor: 'rgba(118, 75, 162, 0.1)',
                borderWidth: 3,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Comparação: ${data.name1.name} vs ${data.name2.name}`
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequência'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Décadas'
                    }
                }
            }
        }
    });
}

// Permitir busca com Enter
document.getElementById('evolutionName').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchEvolution();
});

document.getElementById('name1').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') compareNames();
});

document.getElementById('name2').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') compareNames();
});