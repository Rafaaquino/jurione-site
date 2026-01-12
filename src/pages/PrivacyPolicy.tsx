import { LegalLayout } from "@/components/landing/LegalLayout";
import { SITE_CONTACT } from "@/config/site";

const PrivacyPolicy = () => {
  const privacyEmail = SITE_CONTACT.privacyEmail || SITE_CONTACT.contactEmail;

  return (
    <LegalLayout 
      title="Política de Privacidade" 
      lastUpdated="15 de dezembro de 2024"
    >
      <section>
        <h2>1. Informações Coletadas</h2>
        <p>
          O JuriOne coleta informações necessárias para prestação de serviços jurídicos 
          de automação e gestão. As informações coletadas incluem:
        </p>
        <h3>1.1. Dados Pessoais</h3>
        <ul>
          <li>Nome completo</li>
          <li>Endereço de e-mail</li>
          <li>Telefone</li>
          <li>CPF/CNPJ</li>
          <li>Número da OAB (para advogados)</li>
          <li>Endereço completo (CEP, logradouro, número, complemento, bairro, cidade, estado)</li>
          <li>Data de nascimento</li>
          <li>Foto de perfil (opcional)</li>
        </ul>

        <h3>1.2. Dados de Empresa (Tenant)</h3>
        <ul>
          <li>Razão social ou nome fantasia</li>
          <li>CNPJ</li>
          <li>Endereço comercial</li>
          <li>Dados de contato comercial</li>
          <li>Logo da empresa (opcional)</li>
        </ul>

        <h3>1.3. Dados de Clientes do Escritório</h3>
        <ul>
          <li>Informações de pessoas físicas (nome, CPF, RG, endereço, documentos)</li>
          <li>Informações de pessoas jurídicas (razão social, CNPJ, representante legal)</li>
          <li>Dados bancários (quando necessário para operações financeiras)</li>
          <li>Documentos e contratos relacionados</li>
        </ul>

        <h3>1.4. Dados de Processos Jurídicos</h3>
        <ul>
          <li>Número do processo</li>
          <li>Vara e comarca</li>
          <li>Dados das partes envolvidas</li>
          <li>Documentos processuais</li>
          <li>Petições e contestações</li>
          <li>Prazos e movimentações processuais</li>
        </ul>

        <h3>1.5. Dados de Uso da Plataforma</h3>
        <ul>
          <li>Logs técnicos e de segurança (ex.: autenticação e eventos relevantes)</li>
          <li>Informações de dispositivo e navegador (user agent)</li>
          <li>Endereço IP</li>
          <li>Registros de ações relevantes para segurança, suporte e auditoria</li>
        </ul>
      </section>

      <section>
        <h2>2. Finalidade do Tratamento</h2>
        <p>Utilizamos os dados coletados para:</p>
        <ul>
          <li>Prestação de serviços de gestão jurídica e automação</li>
          <li>Criação e gerenciamento de contas de usuários e empresas</li>
          <li>Processamento de pagamentos e assinaturas</li>
          <li>Geração de petições e documentos jurídicos com inteligência artificial</li>
          <li>Gestão de processos, clientes e contratos</li>
          <li>Envio de notificações sobre prazos, movimentações e eventos importantes</li>
          <li>Melhoria contínua da plataforma e experiência do usuário</li>
          <li>Cumprimento de obrigações legais e regulatórias</li>
          <li>Comunicação sobre atualizações, novidades e suporte técnico</li>
        </ul>
      </section>

      <section>
        <h2>3. Compartilhamento de Dados</h2>
        <p>
          Não vendemos, alugamos ou comercializamos seus dados pessoais. Podemos compartilhar 
          informações apenas nas seguintes situações:
        </p>
        <ul>
          <li>
            <strong>Prestadores de Serviços:</strong> Empresas que nos auxiliam na operação 
            (hospedagem, processamento de pagamentos como Stripe, serviços de e-mail)
          </li>
          <li>
            <strong>Provedores de IA:</strong> Para funcionalidades de IA (ex.: geração de documentos),
            podemos utilizar provedores como OpenAI. O conteúdo enviado é tratado conforme a finalidade
            da solicitação e as políticas do provedor aplicável.
          </li>
          <li>
            <strong>Obrigações Legais:</strong> Quando necessário para cumprir leis, regulamentos 
            ou processos judiciais
          </li>
          <li>
            <strong>Com seu Consentimento:</strong> Em outras situações, apenas com seu 
            consentimento explícito
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Segurança dos Dados</h2>
        <p>
          Implementamos medidas técnicas e organizacionais para proteger seus dados:
        </p>
        <ul>
          <li>Criptografia de dados em trânsito (HTTPS/TLS)</li>
          <li>Criptografia de dados sensíveis (ex.: chaves de API), quando aplicável</li>
          <li>Autenticação baseada em JWT (JSON Web Tokens)</li>
          <li>Isolamento multi-tenant garantindo que dados de diferentes empresas não se misturem</li>
          <li>Controle de acesso baseado em níveis (Administrador, Sênior, Pleno, Júnior)</li>
          <li>Logs e trilhas de auditoria (ex.: autenticação e alterações relevantes)</li>
          <li>Backups regulares e planos de recuperação de desastres</li>
          <li>Monitoramento contínuo de segurança</li>
        </ul>
      </section>

      <section>
        <h2>5. Retenção de Dados</h2>
        <p>
          Mantemos seus dados enquanto sua conta estiver ativa ou enquanto necessário para:
        </p>
        <ul>
          <li>Prestação dos serviços contratados</li>
          <li>Cumprimento de obrigações legais e regulatórias</li>
          <li>Resolução de disputas e aplicação de contratos</li>
        </ul>
        <p>
          Ao encerrar sua conta, você pode solicitar a exclusão dos dados, exceto aqueles 
          que devemos manter por obrigação legal.
        </p>
      </section>

      <section>
        <h2>6. Seus Direitos (LGPD)</h2>
        <p>Você tem direito a:</p>
        <ul>
          <li><strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
          <li><strong>Correção:</strong> Solicitar correção de dados incompletos ou desatualizados</li>
          <li><strong>Anonimização, Bloqueio ou Eliminação:</strong> Solicitar remoção de dados desnecessários</li>
          <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
          <li><strong>Revogação do Consentimento:</strong> Retirar consentimento quando aplicável</li>
          <li><strong>Informação:</strong> Obter informações sobre compartilhamento de dados</li>
        </ul>
        <p>
          Para exercer seus direitos, utilize nosso canal de privacidade:
          {privacyEmail ? (
            <>
              {" "}
              <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>
            </>
          ) : (
            <> consulte os canais de contato informados no site.</>
          )}
        </p>
      </section>

      <section>
        <h2>7. Cookies e Tecnologias Similares</h2>
        <p>
          Utilizamos cookies e tecnologias similares para:
        </p>
        <ul>
          <li>Autenticação e segurança da sessão</li>
          <li>Melhorar a experiência de navegação</li>
          <li>Analisar o uso da plataforma</li>
        </ul>
        <p>
          Você pode configurar seu navegador para recusar cookies, mas isso pode afetar 
          o funcionamento da plataforma.
        </p>
      </section>

      <section>
        <h2>8. Privacidade de Menores</h2>
        <p>
          Nossos serviços são destinados a profissionais do direito e empresas. Não coletamos 
          intencionalmente dados de menores de 18 anos. Se tomarmos conhecimento de coleta 
          inadvertida, tomaremos medidas para excluir essas informações.
        </p>
      </section>

      <section>
        <h2>9. Alterações nesta Política</h2>
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
          mudanças significativas através de e-mail ou aviso na plataforma. A data da última 
          atualização está indicada no início deste documento.
        </p>
      </section>

      <section>
        <h2>10. Contato</h2>
        <p>
          Para dúvidas, solicitações ou exercício de direitos relacionados à privacidade, 
          entre em contato:
        </p>
        <ul>
          {privacyEmail ? (
            <li>
              <strong>E-mail:</strong> <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>
            </li>
          ) : null}
          <li>
            <strong>Encarregado de Dados (DPO):</strong> quando aplicável, o canal será divulgado
            e atendido pelos meios informados nesta página.
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;

