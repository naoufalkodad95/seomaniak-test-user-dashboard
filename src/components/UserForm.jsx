import React, { useState } from 'react';

function UserForm({ onAjouterUtilisateur }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date, setDate] = useState('');
  const [sexe, setSexe] = useState('');
  const [langues, setLangues] = useState([]);
  const [niveauEtudes, setNiveauEtudes] = useState('');
  const [email, setEmail] = useState('');

  const languesDisponibles = [
    { value: 'Français', flag: '🇫🇷' },
    { value: 'Anglais', flag: '🇬🇧' },
    { value: 'Espagnol', flag: '🇪🇸' },
    { value: 'Arabe', flag: '🇸🇦' }
    
  ];

  const handleLangueChange = (e) => {
    const valeur = e.target.value;
    if (e.target.checked) {
      setLangues([...langues, valeur]);
    } else {
      setLangues(langues.filter(langue => langue !== valeur));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nom || !prenom || !date || !sexe || langues.length === 0 || !niveauEtudes || !email) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    onAjouterUtilisateur({ nom, prenom, date, sexe, langues, niveauEtudes, email });
    
    // Réinitialisation
    setNom('');
    setPrenom('');
    setDate('');
    setSexe('');
    setLangues([]);
    setNiveauEtudes('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Même formulaire que avant, sans la partie modification */}
      <div className="mb-3">
        <label className="form-label fw-bold">
          <i className="bi bi-person-vcard me-2 text-primary"></i>
          Nom complet
        </label>
        <div className="row g-2">
          <div className="col-md-6">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nom"
              value={nom} 
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Prénom"
              value={prenom} 
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">
          <i className="bi bi-calendar-heart me-2 text-primary"></i>
          Date de naissance
        </label>
        <input 
          type="date" 
          className="form-control" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">
          <i className="bi bi-gender-ambiguous me-2 text-primary"></i>
          Sexe
        </label>
        <div className="d-flex gap-3 flex-wrap">
          {['Homme', 'Femme', 'Autre'].map((option) => (
            <div className="form-check" key={option}>
              <input 
                className="form-check-input" 
                type="radio" 
                name="sexe" 
                id={`sexe-${option}`}
                value={option}
                checked={sexe === option}
                onChange={(e) => setSexe(e.target.value)}
              />
              <label className="form-check-label" htmlFor={`sexe-${option}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">
          <i className="bi bi-translate me-2 text-primary"></i>
          Langues parlées
        </label>
        <div className="row g-2 p-3 bg-light rounded-3">
          {languesDisponibles.map((langue) => (
            <div className="col-md-6" key={langue.value}>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`langue-${langue.value}`}
                  value={langue.value}
                  checked={langues.includes(langue.value)}
                  onChange={handleLangueChange}
                />
                <label className="form-check-label" htmlFor={`langue-${langue.value}`}>
                  {langue.flag} {langue.value}
                </label>
              </div>
            </div>
          ))}
        </div>
        {langues.length > 0 && (
          <div className="mt-2">
            <span className="badge bg-success">
              {langues.length} langue(s) sélectionnée(s)
            </span>
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">
          <i className="bi bi-mortarboard me-2 text-primary"></i>
          Niveau d'études
        </label>
        <select 
          className="form-select" 
          value={niveauEtudes} 
          onChange={(e) => setNiveauEtudes(e.target.value)}
        >
          <option value="">Sélectionner...</option>
          <option value="Sans diplôme">📝 Sans diplôme</option>
          <option value="CAP/BEP">🔧 CAP/BEP</option>
          <option value="Baccalauréat">📗 Baccalauréat</option>
          <option value="BTS/DUT">📙 BTS/DUT</option>
          <option value="Licence">📕 Licence</option>
          <option value="Master">📔 Master</option>
          <option value="Doctorat">🎓 Doctorat</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">
          <i className="bi bi-envelope me-2 text-primary"></i>
          Email
        </label>
        <input 
          type="email" 
          className="form-control" 
          placeholder="exemple@email.com"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary-custom w-100">
        <i className="bi bi-plus-circle me-2"></i>
        Ajouter
      </button>
    </form>
  );
}

export default UserForm;