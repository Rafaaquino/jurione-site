import { LegalLayout } from "@/components/landing/LegalLayout";
import { SITE_CONTACT } from "@/config/site";

const TermsOfUse = () => {
  const legalEmail = SITE_CONTACT.legalEmail || SITE_CONTACT.contactEmail;

  return (
    <LegalLayout title="Termos de Uso" lastUpdated="15 de dezembro de 2024">
      <section>
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e utilizar a plataforma JuriOne, você concorda em cumprir e
          estar vinculado a estes Termos de Uso. Se você não concordar com
          qualquer parte destes termos, não deverá utilizar nossos serviços.
        </p>
      </section>

      <section>
        <h2>2. Definições</h2>
        <ul>
          <li>
            <strong>"Plataforma"</strong> refere-se ao sistema JuriOne de
            automação jurídica
          </li>
          <li>
            <strong>"Usuário"</strong> é a pessoa física que acessa e utiliza a
            plataforma
          </li>
          <li>
            <strong>"Tenant"</strong> é a empresa ou escritório de advocacia que
            contrata os serviços
          </li>
          <li>
            <strong>"Cliente"</strong> são os clientes do escritório cadastrados
            na plataforma
          </li>
          <li>
            <strong>"Conta"</strong> refere-se à conta de usuário ou empresa na
            plataforma
          </li>
          <li>
            <strong>"Serviços"</strong> são todas as funcionalidades oferecidas
            pela plataforma
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Elegibilidade</h2>
        <p>Para utilizar a plataforma JuriOne, você deve:</p>
        <ul>
          <li>Ser maior de 18 anos</li>
          <li>Ter capacidade legal para contratar serviços</li>
          <li>Fornecer informações precisas e completas ao criar sua conta</li>
          <li>
            Ser profissional do direito ou representante legal de
            escritório/empresa jurídica
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Criação de Conta e Período de Teste</h2>

        <h3>4.1. Cadastro</h3>
        <p>Ao criar uma conta, você concorda em:</p>
        <ul>
          <li>Fornecer informações verdadeiras, precisas e atualizadas</li>
          <li>Manter a segurança de suas credenciais de acesso</li>
          <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
          <li>Ser responsável por todas as atividades em sua conta</li>
        </ul>

        <h3>4.2. Período de Teste Grátis</h3>
        <p>
          Oferecemos um período de teste gratuito de 7 dias. Durante este
          período:
        </p>
        <ul>
          <li>
            Você terá acesso completo às funcionalidades do plano escolhido
          </li>
          <li>O tenant será criado com status TRIAL</li>
          <li>
            Ao término do período, o acesso será bloqueado automaticamente
          </li>
          <li>Para continuar usando, será necessário assinar um plano pago</li>
        </ul>
      </section>

      <section>
        <h2>5. Planos e Assinaturas</h2>

        <h3>5.1. Planos Disponíveis</h3>
        <p>
          Oferecemos diferentes planos de assinatura com características
          específicas:
        </p>
        <ul>
          <li>
            <strong>Básico:</strong> Limitado a 1 usuários e recursos básicos
          </li>
          <li>
            <strong>Profissional:</strong> Até 4 usuários, recursos de IA
            limitados e relatórios
          </li>
          <li>
            <strong>Empresarial:</strong> Até 10 usuários, IA ilimitada e acesso
            à API
          </li>
        </ul>

        <h3>5.2. Pagamentos</h3>
        <ul>
          <li>Os pagamentos são processados através do Stripe</li>
          <li>As assinaturas são mensais e renovadas automaticamente</li>
          <li>Você será cobrado no início de cada período de assinatura</li>
          <li>Preços podem ser alterados com aviso prévio de 30 dias</li>
        </ul>

        <h3>5.3. Cancelamento</h3>
        <p>
          Você pode cancelar sua assinatura a qualquer momento através da
          plataforma. O acesso continuará até o final do período já pago, sem
          reembolso proporcional.
        </p>
      </section>

      <section>
        <h2>6. Uso Aceitável</h2>
        <p>Ao utilizar a plataforma, você concorda em:</p>
        <ul>
          <li>Utilizar os serviços apenas para fins legais e profissionais</li>
          <li>
            Não tentar acessar áreas restritas ou contas de outros usuários
          </li>
          <li>Não interferir ou interromper o funcionamento da plataforma</li>
          <li>
            Não realizar engenharia reversa, descompilação ou desmontagem do
            software
          </li>
          <li>Não introduzir vírus, malware ou código malicioso</li>
          <li>
            Não utilizar sistemas automatizados para acessar a plataforma sem
            autorização
          </li>
          <li>Respeitar os direitos de propriedade intelectual</li>
          <li>Não compartilhar suas credenciais de acesso</li>
        </ul>
      </section>

      <section>
        <h2>7. Responsabilidades do Usuário</h2>
        <p>Você é responsável por:</p>
        <ul>
          <li>
            <strong>Veracidade dos Dados:</strong> Garantir que todas as
            informações cadastradas (clientes, processos, documentos) sejam
            verdadeiras e precisas
          </li>
          <li>
            <strong>Conformidade Legal:</strong> Garantir que o uso da
            plataforma e dos documentos gerados esteja em conformidade com a
            legislação aplicável
          </li>
          <li>
            <strong>Segurança:</strong> Manter a confidencialidade de suas
            credenciais e notificar imediatamente sobre uso não autorizado
          </li>
          <li>
            <strong>Backup:</strong> Manter backups dos dados importantes,
            embora a plataforma realize backups automáticos
          </li>
          <li>
            <strong>Revisão de Conteúdo Gerado por IA:</strong> Revisar e
            validar todo conteúdo gerado por inteligência artificial antes de
            utilizá-lo profissionalmente
          </li>
        </ul>
      </section>

      <section>
        <h2>8. Inteligência Artificial</h2>
        <p>A plataforma utiliza inteligência artificial para:</p>
        <ul>
          <li>Geração de petições iniciais e documentos jurídicos</li>
          <li>Análise de contratos e identificação de cláusulas de risco</li>
          <li>Extração de informações de processos e documentos</li>
        </ul>
        <p>
          <strong>Importante:</strong> Todo conteúdo gerado por IA deve ser
          revisado e validado por um profissional qualificado. A plataforma não
          se responsabiliza por erros ou omissões em documentos gerados
          automaticamente. O usuário é o único responsável pelo conteúdo final
          utilizado em processos judiciais ou documentos legais.
        </p>
        <p>
          As funcionalidades de IA podem depender de provedores externos (ex.:
          OpenAI) e das configurações/credenciais do tenant. O uso deve
          respeitar a legislação aplicável, sigilo profissional e as políticas
          do provedor.
        </p>
      </section>

      <section>
        <h2>9. Propriedade Intelectual</h2>
        <p>
          A plataforma JuriOne, incluindo seu código, design, logotipos, e
          funcionalidades, é protegida por direitos autorais e outras leis de
          propriedade intelectual. Todos os direitos são reservados.
        </p>
        <p>
          Você mantém todos os direitos sobre os dados e documentos que você
          cria, armazena ou gera através da plataforma. Ao utilizar os serviços,
          você nos concede uma licença limitada para armazenar, processar e
          exibir seus dados conforme necessário para prestar os serviços.
        </p>
      </section>

      <section>
        <h2>10. Isolamento Multi-Tenant</h2>
        <p>
          Implementamos isolamento rigoroso entre diferentes tenants (empresas).
          Garantimos que:
        </p>
        <ul>
          <li>
            Dados de diferentes empresas permanecem completamente isolados
          </li>
          <li>Usuários de uma empresa não podem acessar dados de outra</li>
          <li>
            Todas as consultas e operações são automaticamente filtradas por
            tenant_id
          </li>
        </ul>
      </section>

      <section>
        <h2>11. Disponibilidade e Interrupções</h2>
        <p>Nos esforçamos para manter a plataforma disponível 24/7, mas:</p>
        <ul>
          <li>
            Podem ocorrer interrupções para manutenção programada (com aviso
            prévio)
          </li>
          <li>
            Interrupções não programadas podem ocorrer por causas externas
          </li>
          <li>
            Não garantimos disponibilidade 100% e não nos responsabilizamos por
            perdas decorrentes de indisponibilidade temporária
          </li>
        </ul>
      </section>

      <section>
        <h2>12. Limitação de Responsabilidade</h2>
        <p>Na máxima extensão permitida por lei:</p>
        <ul>
          <li>
            A plataforma é fornecida "como está", sem garantias expressas ou
            implícitas
          </li>
          <li>
            Não nos responsabilizamos por decisões profissionais tomadas com
            base em informações ou documentos da plataforma
          </li>
          <li>
            Não garantimos que os serviços atenderão todas as suas necessidades
            específicas
          </li>
          <li>
            Nossa responsabilidade total está limitada ao valor pago nos últimos
            12 meses
          </li>
          <li>
            Não nos responsabilizamos por perda de dados resultante de uso
            inadequado ou falhas de backup do usuário
          </li>
        </ul>
      </section>

      <section>
        <h2>13. Rescisão</h2>
        <p>
          Podemos encerrar ou suspender sua conta imediatamente, sem aviso
          prévio, se você:
        </p>
        <ul>
          <li>Violar estes Termos de Uso</li>
          <li>Utilizar os serviços de forma ilegal ou fraudulenta</li>
          <li>Não realizar pagamentos devidos</li>
          <li>Compartilhar acesso não autorizado</li>
        </ul>
        <p>
          Após a rescisão, seu acesso será encerrado e você poderá solicitar
          exportação de seus dados conforme a LGPD.
        </p>
      </section>

      <section>
        <h2>14. Alterações nos Termos</h2>
        <p>
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
          momento. Alterações significativas serão comunicadas por e-mail ou
          notificação na plataforma. O uso continuado após as alterações
          constitui aceitação dos novos termos.
        </p>
      </section>

      <section>
        <h2>15. Lei Aplicável e Foro</h2>
        <p>
          Estes Termos são regidos pelas leis brasileiras. Qualquer disputa será
          resolvida no foro do domicílio do controlador, salvo disposição legal
          em contrário.
        </p>
      </section>

      <section>
        <h2>16. Contato</h2>
        <p>Para questões sobre estes Termos de Uso:</p>
        <ul>
          {legalEmail ? (
            <li>
              <strong>E-mail:</strong>{" "}
              <a href={`mailto:${legalEmail}`}>{legalEmail}</a>
            </li>
          ) : (
            <li>
              <strong>Canal:</strong> Utilize os canais de contato informados no
              site.
            </li>
          )}
        </ul>
      </section>
    </LegalLayout>
  );
};

export default TermsOfUse;
