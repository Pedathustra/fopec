if exists(select * from sys.procedures where name = 'updAddress')
begin
	drop proc updAddress;
end
go

create proc updAddress
	@id int,
	@line1 varchar(255),
	@line2 varchar(255),
	@city varchar(255 ),
	@state varchar(255),
	@zip varchar(255)
as 
	set nocount on;

	update address 
	set     line1 = @line1,
			line2 = @line2,
			city = @city,
			state = @state, 
			zip = @zip
	where id = @id;
	return 0;
go