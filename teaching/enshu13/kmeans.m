function [M,Z] = kmeans(X, K, maxiter)

if ~exist('maxiter','var')
  maxiter=100;
end

[D,N]=size(X);

% Randomly initialize the cluster assignments Z
id = ceil(K*rand(1,N));
Z = sparse(id, 1:N, ones(1,N), K, N);

% Initialize the cluster centers M
M = zeros(D,K);

M0=inf;
kk=1;
% Iterate until the progress is small enough or maximum number of iterations 
while (kk<1 || norm(M-M0,'fro')>1e-3) && kk<maxiter
  M0 = M;
  % Implement the update for cluster centers M
  
  % Implement the update for cluster assignments Z

  
  kk=kk+1;
end
