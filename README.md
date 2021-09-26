## Labenu Music Awards
### Turma Molina | Grupo I
#### Integrantes
 - Matheus Pimentel Freire
 - Danilo Chagas

#### O que funciona
##### Endpoints
- [x] 01. Endpoint Cadastro
- [x] 02. Endpoint | Login
- [x] 03. Endpoint | Registrar Banda
- [x] 04. Endpoint | Detalhes da Banda
- [x] 05. Endpoint | Adicionar Show
- [x] 06. Endpoint | Ver Shows de uma Data
- [ ] 07. Endpoint | Criar um Ingresso (Desafio)
- [ ] 08. Endpoint | Comprar Ingresso (Desafio)
- [ ] 09. Endpoint | Adicionar Foto (Desafio)
- [ ] 10. Endpoint | Ver Todas as Fotos (Desafio)
- [ ] 11. Endpoint | Frontend Ver Todas as Fotos (Desafio Bônus)

##### Testes
###### User
- [x] Sucesso ao criar usuario
- [x] Retorna erro quando email estiver vazio
- [x] Retorna erro quando email é inválido
- [x] Retorna erro quando 'role' é diferente de 'admin' ou 'normal'
- [x] Retorna erro quando 'password' está ausente ou vazia

###### Band
- [x] Sucesso ao criar banda
- [x] Erro ao criar banda com um valor vazio no 'Body Request'

###### Show
- [x] Sucesso ao criar um show, retornando um 'showId' 
- [x] Erro ao criar um show com 'Body Request' de 'keys' inválidas 
- [x] Erro ao criar um show com 'bandId' inválido
- [x] Erro ao criar um show com 'Body Request' com 'keys' ausentes
- [x] Erro ao criar um show com horário fora do intervalo 8h-23h
- [x] Erro ao criar um show com horário não inteiro, ex.: 8.30h
- [x] Erro ao criar um show já existente no mesmo dia de evento
- [x] Erro ao criar um show que tem conflito de horário com outro show
- [x] Sucesso ao listar shows de um dos dias de evento
- [x] Erro ao listar shows fora dos dias de evento

#### API
- [Documentação API Postman](https://documenter.getpostman.com/view/16227218/UUxxhUYP)
- [Acessar coleção Postman](https://app.getpostman.com/run-collection/16227218-bdb6ce8b-1fca-4525-99a2-63001e51b276?action=collection%2Ffork&collection-url=entityId%3D16227218-bdb6ce8b-1fca-4525-99a2-63001e51b276%26entityType%3Dcollection)

#### Deploy
- Heroku
  - Base URI: ####

<details>
<summary>Enunciado do Projeto</summary>
# Labenu Music Awards
Como você deve saber muito bem, o nosso querido chefinho Astrodev é uma pessoa com Networking incrível e ele conhece vários artistas estrelados. Além disso, ele também é um grande ~~megalomaníaco~~ visionário e está planejando fazer um grande evento: o **LAMA**, *Labenu Musical Awards*, um festival  com várias bandas famosas para a formatura da sua turma e, no final, vocês podem eleger a banda que mais gostaram! Entretanto, na opinião dele, vocês só serão merecedores se entregarem um sistema impecável que permita o gerenciamento completo desses shows.

Para isso já deixamos algumas tabelas prontas para vocês não precisarem se preocupar com a modelagem do banco. Deixamos também um template do projeto já com a estrutura da parte de usuários. Vocês podem usá-las a vontade, mas, se quiser fazer do zero sem esse auxílio, também pode.
</details>