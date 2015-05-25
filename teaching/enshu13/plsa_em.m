function [Phi, Pi, nlogP]=plsa_em(X, K, maxiter, gamma)

% W is the number of words
% D is the number of documents
[W,D]=size(X);

[I,J,N]=find(X);
nnz = length(N);

% Initialize the probability of words given a topic
Phi = rand(W, K); Phi=bsxfun(@rdivide, Phi, sum(Phi));

% Initialize the probability of topics given a document
Pi  = rand(K, D); Pi =bsxfun(@rdivide, Pi, sum(Pi));

% Initialize the posterior probability Q of topics given a word
% (note that we only need to take care of words that appeared in
% each document; the total number nnz << W*D)
Q   = ones(K,nnz)/K;

if ~exist('maxiter','var')
  maxiter = 100;
end

kk=1;
nlogP  = nan*ones(1,maxiter);
while kk<maxiter && (kk<3 || 1-nlogP(kk-1)/nlogP(kk-2)>1e-6)
  % Implement the E step (update Q)
  
  % Implement the M step (update Phi and Pi)
  

  % Compute nlogP
  nlogP(kk) = -sum(N.*log(sum(Phi(I,:).*Pi(:,J)',2)));

  fprintf('kk=%d nlogP=%g\n', kk, nlogP(kk));
  
  kk=kk+1;
end
