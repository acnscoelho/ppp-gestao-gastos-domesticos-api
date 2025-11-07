# 🚀 Testes de Performance - API Gestão Gastos Domésticos

Este diretório contém os testes de performance da API usando **Apache JMeter**.

## 📋 Pré-requisitos

### 1. Instalar o JMeter

1. Acesse: https://jmeter.apache.org/download_jmeter.cgi
2. Baixe a versão binária (apache-jmeter-x.x.zip)
3. Extraia para uma pasta (ex: `C:\apache-jmeter`)
4. Adicione ao PATH do Windows:
   - Vá em `Configurações > Sistema > Sobre > Configurações avançadas do sistema`
   - Clique em "Variáveis de Ambiente"
   - Em "Variáveis do sistema", edite a variável `Path`
   - Adicione: `C:\apache-jmeter\bin`

### 2. Verificar Instalação

Abra o terminal e execute:
```bash
jmeter -v
```

Deve aparecer a versão do JMeter instalada.

---

## 🎯 Teste Implementado

### Endpoint Testado: **POST /users/login**

**Cenário de Carga:**
- 👥 **50 usuários simultâneos**
- ⏱️ **10 segundos de ramp-up** (tempo para iniciar todos os usuários)
- 🔁 **10 requisições por usuário**
- 📊 **Total: 500 requisições**

**Métricas Coletadas:**
- ✅ Tempo de resposta médio
- ✅ Taxa de throughput (requisições/segundo)
- ✅ Percentis (90%, 95%, 99%)
- ✅ Taxa de erro
- ✅ Latência

---

## 🚀 Como Executar

### Opção 1: Via Interface Gráfica do JMeter 🖥️ (Recomendado)

1. **Abra o JMeter**:
   ```bash
   jmeter
   ```

2. **Abra o Test Plan**:
   - File → Open
   - Navegue até: `test/performance/jmeter/login-performance-test.jmx`

3. **Configure as variáveis** (se necessário):
   - No Test Plan, você verá:
     - `BASE_URL`: http://localhost:3000/api
     - `TEST_EMAIL`: anaccoelho19@gmail.com
     - `TEST_PASSWORD`: 123456

4. **Execute o teste**:
   - Clique no botão verde ▶️ (Start)
   - Aguarde a conclusão

5. **Veja os resultados**:
   - Adicione listeners temporariamente se quiser visualizar:
     - View Results Tree: Ver cada requisição
     - Summary Report: Estatísticas gerais
   - **Nota**: Remova os listeners antes de usar em CI/CD

---

### Opção 2: Via Linha de Comando (CI/CD) 🤖

```bash
# Navegar até a pasta do projeto
cd test/performance

# Executar teste e gerar relatório HTML
jmeter -n -t jmeter/login-performance-test.jmx -l results/login-test-results.jtl -e -o results/html-report
```

**Parâmetros:**
- `-n`: Modo não-GUI
- `-t`: Caminho do test plan (.jmx)
- `-l`: Arquivo de log dos resultados (.jtl)
- `-e`: Gerar relatório ao final
- `-o`: Pasta de saída do relatório HTML

---

## 📊 Interpretando os Resultados

### Relatório HTML

Após executar o teste, abra: `test/performance/results/html-report/index.html`

**Principais Métricas:**

| Métrica | O que significa | Valor Ideal |
|---------|-----------------|-------------|
| **Throughput** | Requisições processadas por segundo | Quanto maior, melhor |
| **Average Response Time** | Tempo médio de resposta | < 200ms (ótimo), < 500ms (bom) |
| **Error %** | Porcentagem de erros | 0% |
| **90th Percentile** | 90% das requisições são mais rápidas que esse valor | < 500ms |
| **Min/Max** | Menor e maior tempo de resposta | Diferença pequena = consistente |

### Exemplo de Resultado Esperado

```
Summary Report:
- Samples: 500
- Average: 120ms
- Min: 80ms
- Max: 250ms
- Throughput: 42.5/sec
- Error %: 0.00%
```

---

## 🔧 Personalizar o Teste

### Alterar Número de Usuários

No arquivo `login-performance-test.jmx`, procure:
```xml
<stringProp name="ThreadGroup.num_threads">50</stringProp>
```
Altere `50` para o número desejado.

### Alterar URL da API

No Test Plan, altere:
```xml
<stringProp name="Argument.value">http://localhost:3000/api</stringProp>
```

### Alterar Credenciais de Teste

```xml
<stringProp name="Argument.value">anaccoelho19@gmail.com</stringProp>
<stringProp name="Argument.value">123456</stringProp>
```

---

## 📁 Estrutura de Arquivos

```
test/performance/
├── jmeter/
│   └── login-performance-test.jmx    # Test Plan do JMeter (sem listeners)
├── results/
│   ├── .gitkeep                      # Mantém pasta no Git
│   ├── login-test-results.jtl        # Resultados em formato JTL (gerados)
│   └── html-report/                  # Relatório HTML (gerado)
│       └── index.html
├── .gitignore                         # Ignora arquivos de resultado
└── README.md                          # Esta documentação
```

---

## ⚠️ Observações Importantes

1. **API deve estar rodando**: Certifique-se de que a API está ativa em `http://localhost:3000`

2. **Usuário de teste**: O email `anaccoelho19@gmail.com` com senha `123456` deve existir no banco de dados

3. **Limpar resultados anteriores**: Antes de executar novamente, delete a pasta `results/html-report`

4. **Performance do computador**: Os resultados variam conforme a capacidade do seu computador

5. **Banco de dados**: Use um banco de teste, não o de produção!

---

## 🎓 Próximos Passos

Para expandir os testes de performance:

1. ✅ Adicionar outros endpoints (registro, despesas, receitas)
2. ✅ Implementar testes de stress (aumentar gradualmente a carga)
3. ✅ Criar cenários de usuário (fluxo completo: login → criar despesa → pagar)
4. ✅ Integrar com CI/CD (GitHub Actions)
5. ✅ Monitorar com New Relic durante os testes

---

## 📚 Recursos Úteis

- [Documentação JMeter](https://jmeter.apache.org/usermanual/index.html)
- [Best Practices JMeter](https://jmeter.apache.org/usermanual/best-practices.html)
- [JMeter Plugins](https://jmeter-plugins.org/)

---

## 🆘 Troubleshooting

### Erro: "jmeter não é reconhecido"
- Verifique se o JMeter está no PATH
- Tente reiniciar o terminal

### Erro: "Connection refused"
- Verifique se a API está rodando
- Confirme a URL da API nas variáveis

### Relatório não é gerado
- Delete a pasta `results/html-report` antes de executar
- Verifique permissões de escrita

### Taxa de erro alta
- Verifique se o usuário de teste existe
- Confirme se as credenciais estão corretas
- Verifique logs da API

---

**Desenvolvido para o projeto de Gestão de Gastos Domésticos**

