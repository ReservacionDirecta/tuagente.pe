import React from 'react';
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';
import SEO from '../components/common/SEO';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';
import { agents } from '../utils/constants';

const Agents = () => {
  return (
    <>
      <SEO
        title="Nuestros Agentes | TUAGENTE.PE"
        description="Conoce a nuestro equipo de expertos agentes inmobiliarios."
      />

      <main className="pt-20">
        <section className="bg-primary py-16">
          <Container>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nuestros Agentes
            </h1>
            <p className="text-gray-200 text-lg">
              Conoce a nuestro equipo de profesionales
            </p>
          </Container>
        </section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <Card key={agent.id} hover className="overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {agent.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{agent.role}</p>
                  <p className="text-gray-600 mb-4">{agent.description}</p>

                  <div className="flex space-x-4">
                    {agent.social?.facebook && (
                    <a
                      href={agent.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <IoLogoFacebook className="w-5 h-5" />
                    </a>
                    )}

                    {agent.social?.instagram && (
                    <a
                      href={agent.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <IoLogoInstagram className="w-5 h-5" />
                    </a>
                    )}

                    {agent.social?.linkedin && (
                    <a
                      href={agent.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <IoLogoLinkedin className="w-5 h-5" />
                    </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
};

export default Agents;
