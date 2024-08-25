export interface Usuario {
  id: String;
  nome: String;
  email: String;
  celular: String;
  username: String;
  password: String;
  userRole: 'ADMIN';
  dataAtualizacao: String;
  enabled: true;
  accountNonLocked: true;
  authorities: [
    {
      authority: 'ROLE_ADMIN';
    },
    {
      authority: 'ROLE_USER';
    }
  ];
  accountNonExpired: true;
  credentialsNonExpired: true;
  data_criacao: String;
}
