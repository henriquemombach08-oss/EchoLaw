-- Seed da base de conhecimento jurídico brasileiro
-- Execute no SQL Editor do Supabase após criar a tabela legal_knowledge
-- Os embeddings serão gerados separadamente via API

TRUNCATE legal_knowledge RESTART IDENTITY CASCADE;

INSERT INTO legal_knowledge (source, article, content) VALUES

-- ==================== CLT ====================
('CLT', 'Art. 7 §2°',
 'Para os efeitos previstos neste artigo, considera-se tempo de serviço efetivo, além das horas em que o empregado estiver à disposição do empregador ou executando ordens suas, exceto no caso de força maior, devidamente comprovada, as horas de descanso e de interrupção do trabalho.'),

('CLT', 'Art. 444',
 'As relações contratuais de trabalho podem ser objeto de livre estipulação das partes interessadas em tudo quanto não contravenha às disposições de proteção ao trabalho, às convenções coletivas que lhes sejam aplicáveis e às decisões das autoridades competentes.'),

('CLT', 'Art. 457',
 'Compreendem-se na remuneração do empregado, para todos os efeitos legais, além do salário devido e pago diretamente pelo empregador, como contraprestação do serviço, as gorjetas que receber.'),

('CLT', 'Art. 457 §1°',
 'Integram o salário a importância fixa estipulada, as gratificações legais e as comissões pagas pelo empregador.'),

('CLT', 'Art. 457 §2°',
 'As importâncias, ainda que habituais, pagas a título de ajuda de custo, auxílio-alimentação, vedado seu pagamento em dinheiro, diárias para viagem, prêmios e abonos não integram a remuneração do empregado, não se incorporam ao contrato de trabalho e não constituem base de incidência de qualquer encargo trabalhista e previdenciário.'),

('CLT', 'Art. 468',
 'Nos contratos individuais de trabalho só é lícita a alteração das respectivas condições por mútuo consentimento, e ainda assim desde que não resultem, direta ou indiretamente, prejuízos ao empregado, sob pena de nulidade da cláusula infringente desta garantia.'),

('CLT', 'Art. 468 §1°',
 'Não se considera alteração unilateral a determinação do empregador para que o respectivo empregado reverta ao cargo efetivo, anteriormente ocupado, deixando o exercício de função de confiança.'),

('CLT', 'Art. 477 caput',
 'Na extinção do contrato de trabalho, o empregador deverá proceder à anotação na Carteira de Trabalho e Previdência Social, comunicar a dispensa aos órgãos competentes e realizar o pagamento das verbas rescisórias no prazo e na forma estabelecidos neste artigo.'),

('CLT', 'Art. 477 §6°',
 'A entrega ao empregado de documentos que comprovem a comunicação da extinção contratual aos órgãos competentes bem como o pagamento dos valores constantes do instrumento de rescisão ou recibo de quitação deverão ser efetuados até dez dias contados a partir do término do contrato.'),

('CLT', 'Art. 477 §8°',
 'A inobservância do disposto no §6° deste artigo sujeitará o infrator à multa de 160 BTN, por trabalhador, bem assim ao pagamento da multa a favor do empregado em valor equivalente ao seu salário, devidamente corrigido pelo índice de variação do BTN, salvo quando, comprovadamente, o trabalhador der causa à mora.'),

('CLT', 'Art. 479',
 'Nos contratos que tenham termo estipulado, o empregador que, sem justa causa, despedir o empregado, será obrigado a pagar-lhe, a título de indenização, e por metade, a remuneração a que teria direito até o término do contrato.'),

('CLT', 'Art. 482 caput',
 'Constituem justa causa para rescisão do contrato de trabalho pelo empregador: a) ato de improbidade; b) incontinência de conduta ou mau procedimento; c) negociação habitual por conta própria ou alheia sem permissão do empregador; d) condenação criminal do empregado, passada em julgado, caso não tenha havido suspensão da execução da pena; e) desídia no desempenho das respectivas funções; f) embriaguez habitual ou em serviço; g) violação de segredo da empresa; h) ato de indisciplina ou de insubordinação.'),

('CLT', 'Art. 483 caput',
 'O empregado poderá considerar rescindido o contrato e pleitear a devida indenização quando: a) forem exigidos serviços superiores às suas forças, defesos por lei, contrários aos bons costumes, ou alheios ao contrato; b) for tratado pelo empregador ou por seus superiores hierárquicos com rigor excessivo; c) correr perigo manifesto de mal considerável; d) não cumprir o empregador as obrigações do contrato; e) praticar o empregador ou seus prepostos, contra ele ou pessoas de sua família, ato lesivo da honra e boa fama; f) o empregador ou seus prepostos ofenderem-no fisicamente, salvo em caso de legítima defesa, própria ou de outrem.'),

-- ==================== CDC ====================
('CDC', 'Art. 6 - Direitos básicos',
 'São direitos básicos do consumidor: I - a proteção da vida, saúde e segurança contra os riscos provocados por práticas no fornecimento de produtos e serviços considerados perigosos ou nocivos; II - a educação e divulgação sobre o consumo adequado dos produtos e serviços; III - a informação adequada e clara sobre os diferentes produtos e serviços; IV - a proteção contra a publicidade enganosa e abusiva; V - a modificação das cláusulas contratuais que estabeleçam prestações desproporcionais; VI - a efetiva prevenção e reparação de danos patrimoniais e morais.'),

('CDC', 'Art. 18 caput',
 'Os fornecedores de produtos de consumo duráveis ou não duráveis respondem solidariamente pelos vícios de qualidade ou quantidade que os tornem impróprios ou inadequados ao consumo a que se destinam ou lhes diminuam o valor, assim como por aqueles decorrentes da disparidade, com a indicações constantes do recipiente, da embalagem, rotulagem ou mensagem publicitária.'),

('CDC', 'Art. 18 §1°',
 'Não sendo o vício sanado no prazo máximo de trinta dias, pode o consumidor exigir, alternativamente e à sua escolha: I - a substituição do produto por outro da mesma espécie, em perfeitas condições de uso; II - a restituição imediata da quantia paga, monetariamente atualizada, sem prejuízo de eventuais perdas e danos; III - o abatimento proporcional do preço.'),

('CDC', 'Art. 20 caput',
 'O fornecedor de serviços responde pelos vícios de qualidade que os tornem impróprios ao consumo ou lhes diminuam o valor, assim como por aqueles decorrentes da disparidade com as indicações constantes da oferta ou mensagem publicitária.'),

('CDC', 'Art. 26 caput',
 'O direito de reclamar pelos vícios aparentes ou de fácil constatação caduca em: I - trinta dias, tratando-se de fornecimento de serviço e de produto não duráveis; II - noventa dias, tratando-se de fornecimento de serviço e de produto duráveis.'),

('CDC', 'Art. 27',
 'Prescreve em cinco anos a pretensão à reparação pelos danos causados por fato do produto ou do serviço prevista na Seção II deste Capítulo, iniciando-se a contagem do prazo a partir do conhecimento do dano e de sua autoria.'),

('CDC', 'Art. 49',
 'O consumidor pode desistir do contrato, no prazo de 7 dias a contar de sua assinatura ou do ato de recebimento do produto ou serviço, sempre que a contratação de fornecimento de produtos e serviços ocorrer fora do estabelecimento comercial, especialmente por telefone ou a domicílio.'),

('CDC', 'Art. 49 parágrafo único',
 'Se o consumidor exercitar o direito de arrependimento previsto neste artigo, os valores eventualmente pagos, a qualquer título, durante o prazo de reflexão, serão devolvidos, de imediato, monetariamente atualizados.'),

('CDC', 'Art. 51 caput',
 'São nulas de pleno direito, entre outras, as cláusulas contratuais relativas ao fornecimento de produtos e serviços que: I - impossibilitem, exonerem ou atenuem a responsabilidade do fornecedor por vícios de qualquer natureza dos produtos e serviços; II - subtraiam ao consumidor a opção de reembolso da quantia já paga; III - transfiram responsabilidades a terceiros; IV - estabeleçam obrigações consideradas iníquas, abusivas, que coloquem o consumidor em desvantagem exagerada.'),

('CDC', 'Art. 54 caput',
 'Contrato de adesão é aquele cujas cláusulas tenham sido aprovadas pela autoridade competente ou estabelecidas unilateralmente pelo fornecedor de produtos ou serviços, sem que o consumidor possa discutir ou modificar substancialmente seu conteúdo.'),

('CDC', 'Art. 54 §3°',
 'Os contratos de adesão escritos serão redigidos em termos claros e com caracteres ostensivos e legíveis, cujo tamanho da fonte não será inferior ao corpo doze, de modo a facilitar sua compreensão pelo consumidor.'),

-- ==================== CÓDIGO CIVIL ====================
('Código Civil', 'Art. 104',
 'A validade do negócio jurídico requer: I - agente capaz; II - objeto lícito, possível, determinado ou determinável; III - forma prescrita ou não defesa em lei.'),

('Código Civil', 'Art. 107',
 'A validade da declaração de vontade não dependerá de forma especial, senão quando a lei expressamente a exigir.'),

('Código Civil', 'Art. 112',
 'Nas declarações de vontade se atenderá mais à intenção nelas consubstanciada do que ao sentido literal da linguagem.'),

('Código Civil', 'Art. 113',
 'Os negócios jurídicos devem ser interpretados conforme a boa-fé e os usos do lugar de sua celebração.'),

('Código Civil', 'Art. 187',
 'Também comete ato ilícito o titular de um direito que, ao exercê-lo, excede manifestamente os limites impostos pelo seu fim econômico ou social, pela boa-fé ou pelos bons costumes.'),

('Código Civil', 'Art. 421',
 'A liberdade contratual será exercida nos limites da função social do contrato.'),

('Código Civil', 'Art. 421 parágrafo único',
 'Nas relações contratuais privadas, prevalecerão o princípio da intervenção mínima e a excepcionalidade da revisão contratual.'),

('Código Civil', 'Art. 422',
 'Os contratantes são obrigados a guardar, assim na conclusão do contrato, como em sua execução, os princípios de probidade e boa-fé.'),

('Código Civil', 'Art. 478',
 'Nos contratos de execução continuada ou diferida, se a prestação de uma das partes se tornar excessivamente onerosa, com extrema vantagem para a outra, em virtude de acontecimentos extraordinários e imprevisíveis, poderá o devedor pedir a resolução do contrato. Os efeitos da sentença que a decretar retroagirão à data da citação.'),

('Código Civil', 'Art. 884',
 'Aquele que, sem justa causa, se enriquecer à custa de outrem, será obrigado a restituir o indevidamente auferido, feita a atualização dos valores monetários.'),

-- ==================== CF/88 ====================
('CF/88', 'Art. 5° caput',
 'Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade.'),

('CF/88', 'Art. 5° XXXV',
 'A lei não excluirá da apreciação do Poder Judiciário lesão ou ameaça a direito.'),

('CF/88', 'Art. 5° LIV',
 'Ninguém será privado da liberdade ou de seus bens sem o devido processo legal.'),

('CF/88', 'Art. 5° LV',
 'Aos litigantes, em processo judicial ou administrativo, e aos acusados em geral são assegurados o contraditório e ampla defesa, com os meios e recursos a ela inerentes.'),

('CF/88', 'Art. 7° I',
 'São direitos dos trabalhadores urbanos e rurais: relação de emprego protegida contra despedida arbitrária ou sem justa causa, nos termos de lei complementar, que preverá indenização compensatória, dentre outros direitos.'),

('CF/88', 'Art. 7° III',
 'São direitos dos trabalhadores: fundo de garantia do tempo de serviço (FGTS).'),

('CF/88', 'Art. 7° VIII',
 'São direitos dos trabalhadores: décimo terceiro salário com base na remuneração integral ou no valor da aposentadoria.'),

('CF/88', 'Art. 7° XVII',
 'São direitos dos trabalhadores: gozo de férias anuais remuneradas com, pelo menos, um terço a mais do que o salário normal.'),

('CF/88', 'Art. 7° XXI',
 'São direitos dos trabalhadores: aviso prévio proporcional ao tempo de serviço, sendo no mínimo de trinta dias, nos termos da lei.');
