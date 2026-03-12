import React from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import StatsCard from './StatsCard';
import EditUserModal from './EditUserModal';

function Dashboard({ 
  utilisateurs, 
  onAjouterUtilisateur, 
  onSupprimerUtilisateur, 
  onResetListe,
  onEdit,
  showEditModal,
  onCloseModal,
  utilisateurAModifier,
  onModifierUtilisateur
}) {
  
  const stats = {
    total: utilisateurs.length,
    hommes: utilisateurs.filter(u => u.sexe === 'Homme').length,
    femmes: utilisateurs.filter(u => u.sexe === 'Femme').length,
    autres: utilisateurs.filter(u => u.sexe === 'Autre').length, // AJOUTÉ
    languesParlées: new Set(utilisateurs.flatMap(u => u.langues)).size,
    niveauxEtudes: new Set(utilisateurs.map(u => u.niveauEtudes)).size
  };

  return (
    <div className="dashboard">
      <EditUserModal 
        show={showEditModal}
        onClose={onCloseModal}
        utilisateur={utilisateurAModifier}
        onModifier={onModifierUtilisateur}
      />

      {/* Header avec animation */}
      <div className="header-card">
        <div className="header-content">
          <div className="header-icon">
            <i className="bi bi-people-fill"></i>
          </div>
          <div className="header-text">
            <h1>Dashboard Utilisateurs</h1>
            <p>
              <i className="bi bi-people me-2"></i>
              {utilisateurs.length} utilisateur(s) • 
              <i className="bi bi-gender-ambiguous ms-3 me-2"></i>
              {stats.hommes} H / {stats.femmes} F / {stats.autres} A • 
              <i className="bi bi-translate ms-3 me-2"></i>
              {stats.languesParlées} langue(s) • 
              <i className="bi bi-mortarboard ms-3 me-2"></i>
              {stats.niveauxEtudes} niveau(x)
            </p>
          </div>
        </div>
      </div>

      {/* Cartes statistiques - MAINTENANT 5 CARTES */}
      <div className="stats-row" style={{gridTemplateColumns: 'repeat(5, 1fr)'}}>
        <StatsCard 
          title="Total"
          value={stats.total}
          icon="bi-people-fill"
          color="primary"
          trend="Utilisateurs"
        />
        <StatsCard 
          title="Hommes"
          value={stats.hommes}
          icon="bi-gender-male"
          color="info"
          trend={stats.total > 0 ? `${Math.round(stats.hommes/stats.total*100)}%` : '0%'}
        />
        <StatsCard 
          title="Femmes"
          value={stats.femmes}
          icon="bi-gender-female"
          color="danger"
          trend={stats.total > 0 ? `${Math.round(stats.femmes/stats.total*100)}%` : '0%'}
        />
        <StatsCard 
          title="Autres"
          value={stats.autres}
          icon="bi-gender-trans"
          color="warning"
          trend={stats.total > 0 ? `${Math.round(stats.autres/stats.total*100)}%` : '0%'}
        />
        <StatsCard 
          title="Langues/Études"
          value={`${stats.languesParlées}/${stats.niveauxEtudes}`}
          icon="bi-bar-chart-fill"
          color="success"
          trend="Diversité"
        />
      </div>

      {/* Formulaire et Liste */}
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="form-card">
            <div className="form-header">
              <h4>
                <i className="bi bi-person-plus-fill me-2"></i>
                Ajouter un Utilisateur
              </h4>
            </div>
            <div className="form-body">
              <UserForm onAjouterUtilisateur={onAjouterUtilisateur} />
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="list-card">
            <div className="list-header d-flex justify-content-between align-items-center">
              <h4>
                <i className="bi bi-people-fill me-2"></i>
                Liste des Utilisateurs
                {utilisateurs.length > 0 && (
                  <span className="ms-2 badge-custom" style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '0.3rem 1rem',
                    borderRadius: '50px',
                    fontSize: '0.85rem'
                  }}>
                    {stats.hommes} H · {stats.femmes} F · {stats.autres} A
                  </span>
                )}
              </h4>
              {utilisateurs.length > 0 && (
                <button 
                  className="btn-custom btn-danger-custom"
                  onClick={onResetListe}
                  data-tooltip="Supprimer tous les utilisateurs"
                >
                  <i className="bi bi-trash me-2"></i>
                  Tout effacer
                </button>
              )}
            </div>
            <div className="list-body">
              <UserList 
                utilisateurs={utilisateurs}
                onSupprimerUtilisateur={onSupprimerUtilisateur}
                onEdit={onEdit}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mini graphique de répartition (optionnel) */}
      {utilisateurs.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="form-card">
              <div className="card-body p-4">
                <h5 className="mb-3">
                  <i className="bi bi-pie-chart-fill me-2 text-primary"></i>
                  Répartition par sexe
                </h5>
                <div className="d-flex align-items-center gap-4">
                  {/* Barre de progression */}
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between mb-2">
                      <span><i className="bi bi-gender-male text-info me-1"></i> Hommes</span>
                      <span className="fw-bold">{stats.hommes}</span>
                    </div>
                    <div className="progress mb-3" style={{height: '10px'}}>
                      <div 
                        className="progress-bar bg-info" 
                        style={{width: `${(stats.hommes/stats.total)*100}%`}}
                      ></div>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span><i className="bi bi-gender-female text-danger me-1"></i> Femmes</span>
                      <span className="fw-bold">{stats.femmes}</span>
                    </div>
                    <div className="progress mb-3" style={{height: '10px'}}>
                      <div 
                        className="progress-bar bg-danger" 
                        style={{width: `${(stats.femmes/stats.total)*100}%`}}
                      ></div>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span><i className="bi bi-gender-trans text-warning me-1"></i> Autres</span>
                      <span className="fw-bold">{stats.autres}</span>
                    </div>
                    <div className="progress mb-3" style={{height: '10px'}}>
                      <div 
                        className="progress-bar bg-warning" 
                        style={{width: `${(stats.autres/stats.total)*100}%`}}
                      ></div>
                    </div>
                  </div>

                  {/* Camembert simple avec CSS */}
                  <div className="text-center">
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: `conic-gradient(
                        #4361ee 0% ${(stats.hommes/stats.total)*100}%,
                        #f72585 ${(stats.hommes/stats.total)*100}% ${((stats.hommes+stats.femmes)/stats.total)*100}%,
                        #ffbe0b ${((stats.hommes+stats.femmes)/stats.total)*100}% 100%
                      )`,
                      border: '3px solid white',
                      boxShadow: 'var(--shadow-md)'
                    }}></div>
                    <small className="text-secondary mt-2 d-block">Répartition</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;