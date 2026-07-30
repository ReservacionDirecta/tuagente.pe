import React from 'react';
import { IoLocation, IoCall, IoMail, IoTime } from 'react-icons/io5';
import SEO from '../components/common/SEO';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useContactForm } from '../hooks';
import { contactInfo } from '../utils/constants';

const Contact = () => {
  const {
    values,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleSubmit
  } = useContactForm();

  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <>
      <SEO
        title="Contacto | TUAGENTE.PE"
        description="Contáctanos para más información sobre nuestras propiedades y servicios."
      />

      <main className="pt-20">
        <section className="bg-primary py-16">
          <Container>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contacto
            </h1>
            <p className="text-gray-200 text-lg">
              Estamos aquí para ayudarte
            </p>
          </Container>
        </section>

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envíanos un mensaje
              </h2>

              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  ¡Mensaje enviado correctamente! Te contactaremos pronto.
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Tu nombre completo"
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Teléfono"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="947 859 358"
                  />

                  <Input
                    label="Asunto"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Escribe tu mensaje aquí..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Información de contacto
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <IoLocation className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <IoCall className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <IoMail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <IoTime className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horario</h3>
                    <p className="text-gray-600">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Mapa de ubicación</p>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default Contact;
