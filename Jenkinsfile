node(){
    stage('Cloning Git') {
        checkout scm
    }
        
    stage('Install dependencies') {
        nodejs('nodejs') {
            sh 'npm install'
            echo "Modules installed"
        }
        
    }
    stage('Build') {
        nodejs('nodejs') {
            sh 'npm run build'
            echo "Build completed"
        }
        
    }

    stage('Package Build') {
        sh "tar -zcvf angular.tar.gz dist/project1/"
    }

    stage('Artifacts Creation') {
        fingerprint 'angular.tar.gz'
        archiveArtifacts 'angular.tar.gz'
        echo "Artifacts created"
    }

    stage('Stash changes') {
        stash allowEmpty: true, includes: 'angular.tar.gz', name: 'buildArtifacts'
    }
}

node('project1') {
    echo 'Unstash'
    unstash 'buildArtifacts'
    echo 'Artifacts copied'

    echo 'Copy'
    sh "yes | sudo cp -R angular.tar.gz /var/www/html && cd /var/www/html && sudo tar -xvf angular.tar.gz"
    echo 'Copy completed'
}
