{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
    systems.url = "github:nix-systems/default";
    # https://github.com/cachix/devenv/issues/756
    devenv.url = "github:cachix/devenv/9ba9e3b908a12ddc6c43f88c52f2bf3c1d1e82c1";
  };

  outputs = { self, nixpkgs, devenv, systems, ... } @ inputs:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in
    {
      devShells = forEachSystem
        (system:
          let
            pkgs = nixpkgs.legacyPackages.${system};
          in
          {
            default = devenv.lib.mkShell {
              inherit inputs pkgs;
              modules = [
                {
                  languages.javascript.enable = true;
                  services.postgres = {
                    enable = true;
                    initialDatabases = [{name = "inventory-tracker";}];
                    listen_addresses = "127.0.0.1";
                    initialScript = "CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'password';";
                  };
                }
              ];
            };
          });
    };
}
