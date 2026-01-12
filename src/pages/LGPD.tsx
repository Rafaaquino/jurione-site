import { LegalLayout } from "@/components/landing/LegalLayout";
import { SITE_CONTACT } from "@/config/site";

const LGPD = () => {
  const privacyEmail = SITE_CONTACT.privacyEmail || SITE_CONTACT.contactEmail;
  const dpoEmail = SITE_CONTACT.dpoEmail || privacyEmail;

  return (
    <LegalLayout 
      title="Conformidade com a LGPD" 
      lastUpdated="15 de dezembro de 2024"
    >
      <section>
        <h2>1. Compromisso com a LGPD</h2>
        <p>
          O JuriOne está comprometido em cumprir integralmente a Lei Geral de Proteção de Dados 
          (Lei nº 13.709/2018 - LGPD). Esta página descreve como tratamos os dados pessoais em 
          conformidade com a legislação brasileira de proteção de dados.
        </p>
      </section>

      <section>
        <h2>2. Base Legal para o Tratamento</h2>
        <p>
          Tratamos dados pessoais com base nas seguintes hipóteses legais previstas na LGPD:
        </p>
        
        <h3>2.1. Execução de Contrato</h3>
        <p>
          Para cumprimento do contrato de prestação de serviços, incluindo:
        </p>
        <ul>
          <li>Criação e gestão de contas de usuários</li>
          <li>Prestação de serviços de gestão jurídica</li>
          <li>Processamento de pagamentos</li>
          <li>Geração de documentos e petições</li>
        </ul>

        <h3>2.2. Consentimento</h3>
        <p>
          Para funcionalidades opcionais como:
        </p>
        <ul>
          <li>Envio de comunicações de marketing</li>
          <li>Uso de cookies analíticos</li>
          <li>Compartilhamento de dados com terceiros (quando aplicável)</li>
        </ul>

        <h3>2.3. Legítimo Interesse</h3>
        <p>
          Para melhorar nossos serviços, segurança e experiência do usuário:
        </p>
        <ul>
          <li>Análise de uso da plataforma</li>
          <li>Detecção de fraudes e uso não autorizado</li>
          <li>Melhorias técnicas e funcionais</li>
        </ul>

        <h3>2.4. Cumprimento de Obrigação Legal</h3>
        <p>
          Quando necessário para cumprir obrigações legais, regulatórias ou judiciais.
        </p>
      </section>

      <section>
        <h2>3. Direitos dos Titulares (LGPD)</h2>
        <p>
          Conforme a LGPD, você possui os seguintes direitos sobre seus dados pessoais:
        </p>

        <h3>3.1. Confirmação e Acesso</h3>
        <p>
          Direito de confirmar se tratamos seus dados pessoais e, em caso positivo, 
          acessar esses dados, incluindo informações sobre:
        </p>
        <ul>
          <li>Origem dos dados</li>
          <li>Critérios e duração do tratamento</li>
          <li>Identificação do controlador</li>
          <li>Compartilhamento de dados com terceiros</li>
        </ul>

        <h3>3.2. Correção</h3>
        <p>
          Direito de solicitar a correção de dados incompletos, inexatos ou desatualizados.
        </p>

        <h3>3.3. Anonimização, Bloqueio ou Eliminação</h3>
        <p>
          Direito de solicitar:
        </p>
        <ul>
          <li><strong>Anonimização:</strong> Tornar dados anônimos quando possível</li>
          <li><strong>Bloqueio:</strong> Suspender temporariamente o tratamento</li>
          <li><strong>Eliminação:</strong> Excluir dados desnecessários, excessivos ou 
            tratados em desconformidade com a LGPD
          </li>
        </ul>

        <h3>3.4. Portabilidade</h3>
        <p>
          Direito de receber seus dados em formato estruturado e interoperável, 
          permitindo transferência para outro fornecedor de serviço.
        </p>

        <h3>3.5. Eliminação dos Dados</h3>
        <p>
          Direito de solicitar a eliminação dos dados pessoais tratados com base em 
          consentimento, exceto quando houver obrigação legal de retenção.
        </p>

        <h3>3.6. Informação sobre Compartilhamento</h3>
        <p>
          Direito de obter informações sobre entidades públicas e privadas com as quais 
          compartilhamos dados.
        </p>

        <h3>3.7. Revogação do Consentimento</h3>
        <p>
          Direito de retirar seu consentimento a qualquer momento, sem afetar a legalidade 
          do tratamento anterior.
        </p>

        <h3>3.8. Oposição</h3>
        <p>
          Direito de se opor ao tratamento realizado com base em legítimo interesse, 
          quando há desacordo com o tratamento.
        </p>

        <h3>3.9. Revisão de Decisões Automatizadas</h3>
        <p>
          Direito de solicitar revisão de decisões tomadas unicamente com base em 
          tratamento automatizado de dados pessoais que afetem seus interesses.
        </p>
      </section>

      <section>
        <h2>4. Como Exercer Seus Direitos</h2>
        <p>
          Para exercer qualquer um dos direitos acima, você pode:
        </p>
        <ul>
          <li>
            <strong>Através da Plataforma:</strong> Acesse as configurações da sua conta 
            para visualizar, corrigir ou excluir dados
          </li>
          <li>
            <strong>Por E-mail:</strong> Envie solicitação para 
            {privacyEmail ? (
              <>
                {" "}
                <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>
              </>
            ) : (
              <> os canais de contato informados no site</>
            )} 
            informando qual direito deseja exercer
          </li>
        </ul>
        <p>
          <strong>Prazo de Resposta:</strong> Responderemos sua solicitação em até 15 (quinze) 
          dias corridos, conforme previsto na LGPD.
        </p>
      </section>

      <section>
        <h2>5. Medidas de Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais adequadas para proteger os dados 
          pessoais contra acessos não autorizados, alteração, divulgação ou destruição, que podem incluir:
        </p>

        <h3>5.1. Medidas Técnicas</h3>
        <ul>
          <li>Criptografia de dados em trânsito (HTTPS/TLS)</li>
          <li>Criptografia de dados sensíveis (ex.: chaves de API), quando aplicável</li>
          <li>Autenticação com JWT e cookies HttpOnly, quando aplicável</li>
          <li>Logs de segurança, monitoramento e controles de acesso</li>
          <li>Backups e procedimentos de recuperação</li>
        </ul>

        <h3>5.2. Medidas Organizacionais</h3>
        <ul>
          <li>Controle de acesso baseado em níveis de permissão</li>
          <li>Isolamento multi-tenant rigoroso</li>
          <li>Registros e trilhas de auditoria de acessos/alterações, quando aplicável</li>
          <li>Treinamento e conscientização da equipe sobre proteção de dados, quando aplicável</li>
          <li>Políticas e procedimentos internos de privacidade e segurança</li>
          <li>Definição de responsabilidades e canal de atendimento ao titular (incluindo DPO, quando aplicável)</li>
        </ul>
      </section>

      <section>
        <h2>6. Compartilhamento e Transferência de Dados</h2>
        <p>
          Compartilhamos dados pessoais apenas quando necessário e em conformidade com a LGPD:
        </p>

        <h3>6.1. Prestadores de Serviços</h3>
        <p>
          Compartilhamos dados com empresas que nos auxiliam na prestação de serviços, 
          sempre sob contratos que garantem o mesmo nível de proteção:
        </p>
        <ul>
          <li><strong>Hospedagem:</strong> Servidores em infraestrutura confiável</li>
          <li><strong>Pagamentos:</strong> Stripe para processamento de assinaturas</li>
          <li><strong>E-mail:</strong> Serviços de envio de e-mails transacionais</li>
          <li><strong>Inteligência Artificial:</strong> Provedores como OpenAI para 
            geração/análise de conteúdo conforme solicitação do usuário e políticas aplicáveis
          </li>
        </ul>

        <h3>6.2. Transferências Internacionais</h3>
        <p>
          Alguns prestadores de serviços podem estar localizados fora do Brasil. Quando isso 
          ocorrer, garantimos que:
        </p>
        <ul>
          <li>Os países de destino ofereçam nível adequado de proteção</li>
          <li>Existam cláusulas contratuais padrão ou outros mecanismos legais adequados</li>
          <li>Os dados sejam tratados com o mesmo nível de proteção exigido pela LGPD</li>
        </ul>
      </section>

      <section>
        <h2>7. Retenção de Dados</h2>
        <p>
          Mantemos dados pessoais apenas pelo tempo necessário para:
        </p>
        <ul>
          <li>Prestação dos serviços contratados</li>
          <li>Cumprimento de obrigações legais e regulatórias</li>
          <li>Exercício regular de direitos em processo judicial ou administrativo</li>
        </ul>
        <p>
          Após o término da necessidade, os dados são eliminados de forma segura ou 
          anonimizados, exceto quando a retenção for exigida por lei.
        </p>
      </section>

      <section>
        <h2>8. Dados de Menores</h2>
        <p>
          Nossos serviços são destinados exclusivamente a profissionais do direito e empresas. 
          Não coletamos intencionalmente dados de menores de 18 anos. Se tomarmos conhecimento 
          de coleta inadvertida, eliminaremos imediatamente tais informações.
        </p>
      </section>

      <section>
        <h2>9. Incidentes de Segurança</h2>
        <p>
          Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos 
          titulares, adotaremos as seguintes medidas:
        </p>
        <ul>
          <li>Notificação imediata à ANPD (Autoridade Nacional de Proteção de Dados)</li>
          <li>Comunicação aos titulares afetados em prazo razoável</li>
          <li>Implementação de medidas corretivas imediatas</li>
          <li>Documentação completa do incidente e das medidas adotadas</li>
        </ul>
      </section>

      <section>
        <h2>10. Encarregado de Proteção de Dados (DPO)</h2>
        <p>
          Quando aplicável, teremos um Encarregado de Proteção de Dados (DPO) responsável por:
        </p>
        <ul>
          <li>Receber comunicações dos titulares e da ANPD</li>
          <li>Orientar funcionários sobre práticas de proteção de dados</li>
          <li>Realizar auditorias de conformidade</li>
          <li>Atuar como canal de comunicação entre controlador, titulares e ANPD</li>
        </ul>
        <p>
          <strong>Contato do DPO:</strong>
        </p>
        <ul>
          {dpoEmail ? (
            <li>
              E-mail: <a href={`mailto:${dpoEmail}`}>{dpoEmail}</a>
            </li>
          ) : (
            <li>Consulte os canais de contato informados no site.</li>
          )}
        </ul>
      </section>

      <section>
        <h2>11. Alterações nesta Política</h2>
        <p>
          Podemos atualizar esta política de conformidade com a LGPD periodicamente. 
          Alterações significativas serão comunicadas por e-mail ou notificação na plataforma. 
          A data da última atualização está indicada no início deste documento.
        </p>
      </section>

      <section>
        <h2>12. Contato e Reclamações</h2>
        <p>
          Para questões relacionadas à proteção de dados e exercício de direitos:
        </p>
        <ul>
          {privacyEmail ? (
            <li>
              <strong>E-mail Geral:</strong> <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>
            </li>
          ) : null}
          {dpoEmail ? (
            <li>
              <strong>DPO:</strong> <a href={`mailto:${dpoEmail}`}>{dpoEmail}</a>
            </li>
          ) : null}
        </ul>
        <p>
          Você também pode apresentar reclamação diretamente à 
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">
            Autoridade Nacional de Proteção de Dados (ANPD)
          </a> caso considere que o tratamento de seus dados pessoais está sendo 
          realizado em desconformidade com a LGPD.
        </p>
      </section>

      <section>
        <h2>13. Legislação Aplicável</h2>
        <p>
          Esta política está em conformidade com:
        </p>
        <ul>
          <li>Lei Geral de Proteção de Dados - LGPD (Lei nº 13.709/2018)</li>
          <li>Marco Civil da Internet (Lei nº 12.965/2014)</li>
          <li>Normativas da Autoridade Nacional de Proteção de Dados (ANPD)</li>
          <li>Demais legislações aplicáveis à proteção de dados no Brasil</li>
        </ul>
      </section>
    </LegalLayout>
  );
};

export default LGPD;

