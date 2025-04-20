if exists( select * from sys.views where name = 'vVotes')
begin 
	drop view vVotes
end 
go
create view vVotes

as 
 
	select		voter.id voter_id,
				voter.username voter_username,
				observer.id observer_id,
				observer.username observer_username,
				crv.vote_type,
				crv.created vote_created, 
				crv.updated vote_updated,
				c.id  company_name,
				c.[name] comany_name,
				parent.id parent_id,
				parent.name parent_name,
				cr.notes

	from		person voter
		join	crowdsourced_research_vote  crv on voter.id = crv.person_id
		join	crowdsourced_research cr on crv.crowdsourced_research_id = cr.id
		join	company c on cr.company_id = c.id
		join	company parent on cr.parent_company_id = parent.id
		join	person observer on cr.observing_person_id = observer.id
 go